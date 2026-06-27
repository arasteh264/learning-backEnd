import { Request, Response } from "express";
import { RequestPaymentUseCase } from "../../application/usecases/payment/RequestPaymentUseCase";
import { VerifyPaymentUseCase } from "../../application/usecases/payment/VerifyPaymentUseCase";
import { GetAllTransactionsUseCase } from "../../application/usecases/payment/GetAllTransactions";
import { ApiResponse } from "../../shared/http/api-response";
import { asyncHandler } from "../../shared/asyncHandler";
import { PaymentMessages } from "../../shared/messages/payment.message";

type AuthRequest = Request & {
  user: { id: string };
};

export class PaymentController {
  constructor(
    private requestPaymentUseCase: RequestPaymentUseCase,
    private verifyPaymentUseCase: VerifyPaymentUseCase,
    private getAllTransactionsUseCase: GetAllTransactionsUseCase,
  ) {}

  requestPayment = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    const { orderId } = req.body;

    if (!orderId) {
      throw new Error("orderId الزامی است");
    }

    const result = await this.requestPaymentUseCase.execute(
      orderId,
      userId,
    );

    if (result.free) {
      return ApiResponse.success(
        res,
        null,
        PaymentMessages.FREE_COURSE,
      );
    }

    return ApiResponse.success(res, {
      paymentUrl: result.paymentUrl,
      free: false,
    }, PaymentMessages.TRANSACTIONS_FETCHED);
  });

  verifyPayment = asyncHandler(async (req: Request, res: Response) => {
    const authority = req.query.Authority as string;
    const status = req.query.Status as string;

    const result = await this.verifyPaymentUseCase.execute(
      authority,
      status,
    );

    const frontendUrl = process.env.FRONTEND_URL!;

    if (result.success) {
      return res.redirect(
        `${frontendUrl}/payment/success?orderId=${result.orderId}`,
      );
    }

    return res.redirect(
      `${frontendUrl}/payment/failed?orderId=${result.orderId}`,
    );
  });

  getAllTransactions = asyncHandler(async (_req: Request, res: Response) => {
    const transactions =
      await this.getAllTransactionsUseCase.execute();

    return ApiResponse.success(
      res,
      transactions,
      PaymentMessages.TRANSACTIONS_FETCHED,
    );
  });
}