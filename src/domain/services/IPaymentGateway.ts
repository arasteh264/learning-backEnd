export interface IPaymentGateway {
  requestPayment(params: {
    amount: number;
    description: string;
    callbackUrl: string;
  }): Promise<{ authority: string; paymentUrl: string }>;

  verifyPayment(params: {
    amount: number;
    authority: string;
  }): Promise<{ success: boolean; refId?: string }>;
}