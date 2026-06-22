import { CartRepository } from "../../../domain/repositories/CartRepository";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
type Item = {
  courseId: string;
  price: number;
};
export class CreateOrderUseCase {
  constructor(
    private cartRepo: CartRepository,
    private orderRepo: OrderRepository,
  ) {}

  async execute(userId: string) {
    const cart = await this.cartRepo.getCartWithItems(userId);

    if (!cart || !cart.cart_items?.length) {
      throw new Error("سبد خرید شما خالی است");
    }
    const items = cart.cart_items.map((item: any) => {
      const course = item?.courses;

      const price = Number(course?.price ?? 0);
      const discount = Number(course?.discount ?? 0);

      const finalPrice =
        discount > 0 ? Math.round(price - (price * discount) / 100) : price;

      return { courseId: course?.id, price: finalPrice };
    });
    const totalprice = items.reduce((sum: number, item: Item) => {
      return sum + item.price;
    }, 0);
    console.log("Total price:", totalprice);

    const order = await this.orderRepo.createOrder(userId, items, totalprice);

    await this.cartRepo.clearCart(cart.id);

    return order;
  }
}
