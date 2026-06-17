import { CartRepository } from "../../../domain/repositories/CartRepository";

export class GetCartUseCase {
  constructor(private cartRepo: CartRepository) {}

  async execute(userId: string) {
    const cart = await this.cartRepo.getCartWithItems(userId);

    if (!cart) return { items: [], total: 0, count: 0 };

    const items = cart.cart_items || [];

    const total = items.reduce((sum: number, item: any) => {
      const course = item.courses;
      const price = course.price ?? 0;
      const discount = course.discount ?? 0;
      const finalPrice = discount > 0
        ? Math.round(price - (price * discount) / 100)
        : price;
      return sum + finalPrice;
    }, 0);

    return { id: cart.id, items, total, count: items.length };
  }
}