import supabase from "../../config/supabase";
import { CategoryRepository } from "../../domain/repositories/CategoryRepository";

export class SupabaseCategoryRepository implements CategoryRepository {

  async create(data: any) {
    const { data: result, error } = await supabase
      .from("categories")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("categories")
      .select("*");

    if (error) throw error;
    return data;
  }

  async update(id: string, data: any) {
    const { data: result, error } = await supabase
      .from("categories")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async delete(id: string) {
    const { data, error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}