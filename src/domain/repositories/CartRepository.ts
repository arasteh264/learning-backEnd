export interface CartRepository {
  getOrCreateCart(userId: string): Promise<any>;
  getCartWithItems(userId: string): Promise<any>;
  addItem(cartId: string, courseId: string): Promise<any>;
  removeItem(cartId: string, courseId: string): Promise<void>;
  clearCart(cartId: string): Promise<void>;
  isItemInCart(cartId: string, courseId: string): Promise<boolean>;
}