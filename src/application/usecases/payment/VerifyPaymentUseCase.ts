import { EnrollmentRepository } from "../../../domain/repositories/EnrollmentRepository";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { TransactionRepository } from "../../../domain/repositories/TransactionRepository";
import { IPaymentGateway } from "../../../domain/services/IPaymentGateway";

export class VerifyPaymentUseCase {
  constructor(
    private orderRepo: OrderRepository,
    private transactionRepo: TransactionRepository,
    private enrollmentRepo: EnrollmentRepository,
    private paymentGateway: IPaymentGateway
  ) {}

  async execute(authority: string, gatewayStatus: string) {
    // قدم ۱: تراکنش رو با authority پیدا می‌کنیم
    const transaction = await this.transactionRepo.findByAuthority(authority);

    if (!transaction) {
      throw new Error("تراکنش یافت نشد");
    }

    // اگه قبلاً موفق شده، دوباره پردازش نکن (جلوگیری از enrollment تکراری)
    if (transaction.status === "success") {
      return { success: true, orderId: transaction.order_id, alreadyProcessed: true };
    }

    // قدم ۲: اگه کاربر از درگاه لغو کرده باشه
    if (gatewayStatus !== "OK") {
      await this.transactionRepo.markAsFailed(transaction.id);
      await this.orderRepo.updateStatus(transaction.order_id, "failed");
      return { success: false, orderId: transaction.order_id };
    }

    // قدم ۳: با درگاه تأیید می‌کنیم که پرداخت واقعاً انجام شده
    // (هیچ‌وقت فقط به برگشتن کاربر از درگاه اعتماد نمی‌کنیم - باید verify کنیم)
    const result = await this.paymentGateway.verifyPayment({
      amount: transaction.amount,
      authority,
    });

    if (!result.success) {
      await this.transactionRepo.markAsFailed(transaction.id);
      await this.orderRepo.updateStatus(transaction.order_id, "failed");
      return { success: false, orderId: transaction.order_id };
    }

    // قدم ۴: تراکنش رو موفق علامت می‌زنیم
    await this.transactionRepo.markAsSuccess(transaction.id, result.refId!);

    // قدم ۵: سفارش رو پرداخت‌شده علامت می‌زنیم
    await this.orderRepo.updateStatus(transaction.order_id, "paid");

    // قدم ۶: به کاربر دسترسی دوره‌ها رو می‌دیم (enrollment)
    const order = await this.orderRepo.findById(transaction.order_id);

    for (const item of order.order_items) {
      await this.enrollmentRepo.create({
        userId: transaction.user_id,
        courseId: item.course_id,
        orderId: order.id,
      });
    }

    return { success: true, orderId: order.id, refId: result.refId };
  }
}