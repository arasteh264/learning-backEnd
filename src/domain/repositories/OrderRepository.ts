export interface OrderRepository {
  createOrder(
    userId: string,
    items: { courseId: string; price: number }[],
    totalprice: number,
  ): Promise<any>;

  findById(id: string): Promise<any | null>;
  findByUser(userId: string): Promise<any[]>;
  updateStatus(id: string, status: string): Promise<any>;
}
