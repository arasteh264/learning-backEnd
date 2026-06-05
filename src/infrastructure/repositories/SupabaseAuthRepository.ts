import supabase from "../../config/supabase";
import { AuthRepository } from "../../domain/repositories/AuthRepository";


export class SupabaseAuthRepository implements AuthRepository {
  async findByEmailOrUsername(identifier: string) {
    const { data } = await supabase
      .from("users")
      .select("*")
      .or(`email.eq.${identifier},username.eq.${identifier}`);

    return data?.[0];
  }

  async findByPhone(phone: string) {
    const { data } = await supabase
      .from("banned_users")
      .select("*")
      .eq("phone", phone)
      .maybeSingle();

    return data;
  }

  async count() {
    const { count } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    return count || 0;
  }

  async create(data: any) {
    const { data: user, error } = await supabase
      .from("users")
      .insert(data)
      .select()
      .single();

    if (error) throw error;

    return user;
  }
}
