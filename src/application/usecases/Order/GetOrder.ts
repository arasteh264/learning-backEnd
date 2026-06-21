import { OrderRepository } from "../../../domain/repositories/OrderRepository";

export class GetOrderUseCase {
  constructor(private  orderRepo: OrderRepository) {}

  async execute() {
    return await this.orderRepo.findAll();
  }
}