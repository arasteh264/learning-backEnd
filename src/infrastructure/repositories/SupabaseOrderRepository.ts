import supabase from "../../config/supabase";
import { OrderRepository } from "../../domain/repositories/OrderRepository";

export class SupabaseOrderRepository implements OrderRepository {
  async createOrder(
    userId: string,
    items: { courseId: string; price: number }[],
    totalprice: number,
  ) {
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        totalprice: totalprice,
        status: "pending",
      })
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = items.map((item) => ({
      order_id: order.id,
      course_id: item.courseId,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return order;
  }

  async findById(id: string) {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          id,
          course_id,
          price,
          courses:course_id ( id, name, cover, href )
        )
      `,
      )
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  }

  async findByUser(userId: string) {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          id,
          course_id,
          price,
          courses:course_id ( id, name, cover, href )
        )
      `,
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from("orders")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
async findAll() {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      user:user_id (
        id,
        name
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}
}
