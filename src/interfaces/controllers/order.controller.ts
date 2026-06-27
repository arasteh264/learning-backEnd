import { Request, Response } from "express";
import { CreateOrderUseCase } from "../../application/usecases/Order/CreateOrderUseCase";
import { GetOrderUseCase } from "../../application/usecases/Order/GetOrder";
import { ApiResponse } from "../../shared/http/api-response";
import { asyncHandler } from "../../shared/asyncHandler";
import { OrderMessages } from "../../shared/messages/common.messages";

type AuthRequest = Request & {
  user: { id: string };
};

export class OrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private getOrderUseCase: GetOrderUseCase
  ) {}

  createOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;

    const order = await this.createOrderUseCase.execute(userId);

    return ApiResponse.created(
      res,
      order,
      OrderMessages.CREATED,
    );
  });

  getAllOrders = asyncHandler(async (_req: Request, res: Response) => {
    const orders = await this.getOrderUseCase.execute();

    return ApiResponse.success(
      res,
      orders,
      OrderMessages.FETCHED,
    );
  });
}