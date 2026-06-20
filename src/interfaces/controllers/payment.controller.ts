import { Request, Response } from "express";
import { RequestPaymentUseCase } from "../../application/usecases/payment/RequestPaymentUseCase";
import { VerifyPaymentUseCase } from "../../application/usecases/payment/VerifyPaymentUseCase";


export class PaymentController {
  constructor(
    private requestPaymentUseCase: RequestPaymentUseCase,
    private verifyPaymentUseCase: VerifyPaymentUseCase
  ) {}

  requestPayment = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const { orderId } = req.body;

      if (!orderId) throw new Error("orderId الزامی است");

      const result = await this.requestPaymentUseCase.execute(orderId, userId);

      if (result.free) {
        return res.status(200).json({
          free: true,
          message: "دوره رایگان با موفقیت فعال شد",
        });
      }

      return res.status(200).json({
        free: false,
        paymentUrl: result.paymentUrl,
      });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  };

  verifyPayment = async (req: Request, res: Response) => {
    try {
      const authority = req.query.Authority as string;
      const status = req.query.Status as string;

      const result = await this.verifyPaymentUseCase.execute(authority, status);

      const frontendUrl = process.env.FRONTEND_URL;

      if (result.success) {
        return res.redirect(
          `${frontendUrl}/payment/success?orderId=${result.orderId}`
        );
      } else {
        return res.redirect(
          `${frontendUrl}/payment/failed?orderId=${result.orderId}`
        );
      }
    } catch (err: any) {
      const frontendUrl = process.env.FRONTEND_URL;
      return res.redirect(`${frontendUrl}/payment/failed`);
    }
  };
}