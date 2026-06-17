import { CartRepository } from "../../../domain/repositories/CartRepository";

export class RemoveFromCartUseCase {
  constructor(private cartRepo: CartRepository) {}

  async execute(userId: string, courseId: string) {
    const cart = await this.cartRepo.getOrCreateCart(userId);
    await this.cartRepo.removeItem(cart.id, courseId);
  }
}