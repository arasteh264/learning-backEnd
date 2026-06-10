import supabase from "../../config/supabase";
import { SliderRepository } from "../../domain/repositories/SliderRepository";

export class SupabaseSliderRepository implements SliderRepository {
  async create(data: any) {
    const { data: result, error } = await supabase
      .from("sliders")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("sliders")
      .select("*")
      .order("order", { ascending: true });

    if (error) throw error;
    return data;
  }

  async findById(id: string) {
    const { data, error } = await supabase
      .from("sliders")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, data: any) {
    const { data: result, error } = await supabase
      .from("sliders")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async delete(id: string) {
    const { data, error } = await supabase
      .from("sliders")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}