import { Request, Response } from "express";
import { GetCartUseCase } from "../../application/usecases/cart/GetCart";
import { AddToCartUseCase } from "../../application/usecases/cart/AddToCart";
import { RemoveFromCartUseCase } from "../../application/usecases/cart/RemoveFromCart";
import { ApiResponse } from "../../shared/http/api-response";
import { asyncHandler } from "../../shared/asyncHandler";
import { CartMessages } from "../../shared/messages/cart.messages";

type AuthRequest = Request & {
  user: { id: string };
};

export class CartController {
  constructor(
    private getCartUseCase: GetCartUseCase,
    private addToCartUseCase: AddToCartUseCase,
    private removeFromCartUseCase: RemoveFromCartUseCase
  ) {}

  getCart = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;

    const cart = await this.getCartUseCase.execute(userId);

    return ApiResponse.success(
      res,
      cart,
      CartMessages.FETCHED,
    );
  });

  addToCart = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      throw new Error(CartMessages.COURSE_REQUIRED);
    }

    const result = await this.addToCartUseCase.execute(
      userId,
      courseId,
    );

    return ApiResponse.created(
      res,
      result,
      CartMessages.ADDED,
    );
  });

  removeFromCart = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    const courseId = req.params.courseId as string;

    await this.removeFromCartUseCase.execute(
      userId,
      courseId,
    );

    return ApiResponse.success(
      res,
      null,
      CartMessages.REMOVED,
    );
  });
}