import { Request, Response } from "express";
import { CreateOrderUseCase } from "../../application/usecases/Order/CreateOrderUseCase";

export class OrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  createOrder = async (req: Request, res: Response) => {
    try {
      
      const userId = (req as any).user.id;
      const order = await this.createOrderUseCase.execute(userId);

      return res.status(201).json({
        message: "سفارش با موفقیت ایجاد شد",
        order,
      });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  };
}