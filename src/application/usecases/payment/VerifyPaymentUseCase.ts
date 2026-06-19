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
    const transaction = await this.transactionRepo.findByAuthority(authority);

    if (!transaction) {
      throw new Error("تراکنش یافت نشد");
    }

    if (transaction.status === "success") {
      return { success: true, orderId: transaction.order_id, alreadyProcessed: true };
    }

    if (gatewayStatus !== "OK") {
      await this.transactionRepo.markAsFailed(transaction.id);
      await this.orderRepo.updateStatus(transaction.order_id, "failed");
      return { success: false, orderId: transaction.order_id };
    }

    const result = await this.paymentGateway.verifyPayment({
      amount: transaction.amount,
      authority,
    });

    if (!result.success) {
      await this.transactionRepo.markAsFailed(transaction.id);
      await this.orderRepo.updateStatus(transaction.order_id, "failed");
      return { success: false, orderId: transaction.order_id };
    }

    await this.transactionRepo.markAsSuccess(transaction.id, result.refId!);

    await this.orderRepo.updateStatus(transaction.order_id, "paid");

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