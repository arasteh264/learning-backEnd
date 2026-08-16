import supabase from "../../config/supabase";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class SupabaseUserRepository implements UserRepository {
  async findAll(): Promise<any[]> {
  

    const { data } = await supabase
      .from("users")
      .select("id, name, email, phone, role, created_at, username");


    return data ?? [];
  }

  async findById(id: string) {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    return data;
  }

  async delete(id: string) {
    await supabase.from("users").delete().eq("id", id);
  }

  async update(id: string, data: any) {
    const { data: result } = await supabase
      .from("users")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    return result;
  }

  async banToggle(userId: string) {
    const { data: existing } = await supabase
      .from("banned_users")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (existing) {
      await supabase.from("banned_users").delete().eq("user_id", userId);
      return false;
    }

    await supabase.from("banned_users").insert([{ user_id: userId }]);
    return true;
  }


  async updatePasswordByIdentifier(identifier: string, passwordHash: string): Promise<void> {
  await supabase
    .from("users")
    .update({ password_hash: passwordHash })
    .or(`email.eq.${identifier},phone.eq.${identifier}`);
}
}
