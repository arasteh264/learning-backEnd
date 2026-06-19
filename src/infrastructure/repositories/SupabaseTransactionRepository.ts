import supabase from "../../config/supabase";
import { TransactionRepository } from "../../domain/repositories/TransactionRepository";

export class SupabaseTransactionRepository implements TransactionRepository {
  async create(data: {
    orderId: string;
    userId: string;
    amount: number;
    authority: string;
    gateway: string;
  }) {
    const { data: result, error } = await supabase
      .from("transactions")
      .insert({
        order_id: data.orderId,
        user_id: data.userId,
        amount: data.amount,
        authority: data.authority,
        gateway: data.gateway,
        status: "pending",
      })
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async findByAuthority(authority: string) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("authority", authority)
      .single();

    if (error) return null;
    return data;
  }

  async markAsSuccess(id: string, refId: string) {
    const { data, error } = await supabase
      .from("transactions")
      .update({
        status: "success",
        ref_id: refId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async markAsFailed(id: string) {
    const { data, error } = await supabase
      .from("transactions")
      .update({ status: "failed", updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}