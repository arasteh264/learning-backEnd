import supabase from "../../config/supabase";
import { TeacherRepository } from "../../domain/repositories/TeacherRepository";

export class SupabaseTeacherRepository implements TeacherRepository {

  async create(data: any) {
    const { data: result, error } = await supabase
      .from("teachers")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("teachers")
      .select(`
        *,
        users(name, email)
      `);

    if (error) throw error;
    return data;
  }

  async findByUserId(userId: string) {
    const { data, error } = await supabase
      .from("teachers")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  async update(id: string, data: any) {
    const { data: result, error } = await supabase
      .from("teachers")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async delete(id: string) {
    const { data, error } = await supabase
      .from("teachers")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async findVerified() {
    const { data, error } = await supabase
      .from("teachers")
      .select(`
        id,
        is_verified,
        users(name)
      `)
      .eq("is_verified", true);

    if (error) throw error;
    return data;
  }
}