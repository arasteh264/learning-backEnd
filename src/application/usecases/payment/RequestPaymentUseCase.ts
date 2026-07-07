import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { TransactionRepository } from "../../../domain/repositories/TransactionRepository";
import { IPaymentGateway } from "../../../domain/services/IPaymentGateway";

export class RequestPaymentUseCase {
  constructor(
    private orderRepo: OrderRepository,
    private transactionRepo: TransactionRepository,
    private paymentGateway: IPaymentGateway,
  ) {}

  async execute(orderId: string, userId: string) {
    const order = await this.orderRepo.findById(orderId);

    if (!order) throw new Error("سفارش یافت نشد");

    if (order.user_id !== userId)
      throw new Error("شما مجاز به پرداخت این سفارش نیستید");
    if (order.status === "paid") throw new Error("این سفارش قبلاً پرداخت شده");

    if (order.totalprice === 0) {
      await this.orderRepo.updateStatus(orderId, "paid");
      return { free: true, orderId };
    }

    const callbackUrl = `${process.env.BASE_URL}/v1/payment/verify`;

    const { authority, paymentUrl } = await this.paymentGateway.requestPayment({
      amount: order.totalprice,
      description: `پرداخت سفارش ${orderId}`,
      callbackUrl,
    });

    await this.transactionRepo.create({
      orderId,
      userId,
      amount: order.totalprice,
      authority,
      gateway: "zarinpal",
    });

    await this.orderRepo.updateStatus(orderId, "awaiting_payment");

    return { free: false, paymentUrl };
  }
}
