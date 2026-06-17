import supabase from "../../config/supabase";
import { CartRepository } from "../../domain/repositories/CartRepository";

export class SupabaseCartRepository implements CartRepository {
  async getOrCreateCart(userId: string) {
    const { data: existing } = await supabase
      .from("carts")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (existing) return existing;

    const { data, error } = await supabase
      .from("carts")
      .insert({ user_id: userId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getCartWithItems(userId: string) {
    const { data, error } = await supabase
      .from("carts")
      .select(`
        *,
        cart_items (
          id,
          course_id,
          courses:course_id (
            id,
            name,
            cover,
            href,
            price,
            discount
          )
        )
      `)
      .eq("user_id", userId)
      .single();

    if (error) return null;
    return data;
  }

  async addItem(cartId: string, courseId: string) {
    const { data, error } = await supabase
      .from("cart_items")
      .insert({ cart_id: cartId, course_id: courseId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async removeItem(cartId: string, courseId: string) {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_id", cartId)
      .eq("course_id", courseId);

    if (error) throw error;
  }

  async clearCart(cartId: string) {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_id", cartId);

    if (error) throw error;
  }

  async isItemInCart(cartId: string, courseId: string) {
    const { data } = await supabase
      .from("cart_items")
      .select("id")
      .eq("cart_id", cartId)
      .eq("course_id", courseId)
      .single();

    return !!data;
  }
}