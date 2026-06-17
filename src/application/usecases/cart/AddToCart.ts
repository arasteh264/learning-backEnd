import { CartRepository } from "../../../domain/repositories/CartRepository";
import { CourseRepository } from "../../../domain/repositories/CourseRepository";

export class AddToCartUseCase {
  constructor(
    private cartRepo: CartRepository,
    private courseRepo: CourseRepository
  ) {}

  async execute(userId: string, courseId: string) {
    const course = await this.courseRepo.findById(courseId);
    if (!course) throw new Error("دوره یافت نشد");

    const cart = await this.cartRepo.getOrCreateCart(userId);

    const alreadyInCart = await this.cartRepo.isItemInCart(cart.id, courseId);
    if (alreadyInCart) throw new Error("این دوره قبلاً به سبد اضافه شده");

    return await this.cartRepo.addItem(cart.id, courseId);
  }
}