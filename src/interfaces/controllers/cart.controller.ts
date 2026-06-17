import { Request, Response } from "express";
import { GetCartUseCase } from "../../application/usecases/cart/GetCart";
import { AddToCartUseCase } from "../../application/usecases/cart/AddToCart";
import { RemoveFromCartUseCase } from "../../application/usecases/cart/RemoveFromCart";

export class CartController {
  constructor(
    private getCartUseCase: GetCartUseCase,
    private addToCartUseCase: AddToCartUseCase,
    private removeFromCartUseCase: RemoveFromCartUseCase
  ) {}

  getCart = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const cart = await this.getCartUseCase.execute(userId);
      return res.status(200).json(cart);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };

  addToCart = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const { courseId } = req.body;

      if (!courseId) throw new Error("courseId الزامی است");

      const result = await this.addToCartUseCase.execute(userId, courseId);
      return res.status(201).json({
        message: "دوره با موفقیت به سبد اضافه شد",
        item: result,
      });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  };

  removeFromCart = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const { courseId } = req.params;

      await this.removeFromCartUseCase.execute(userId, courseId);
      return res.status(200).json({ message: "دوره از سبد حذف شد" });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  };
}