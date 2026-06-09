import supabase from "../../config/supabase";
import { AnnouncementRepository } from "../../domain/repositories/AnnouncementRepository";

export class SupabaseAnnouncementRepository implements AnnouncementRepository {
async create(data: any) {
  const { data: result, error } = await supabase
    .from("announcements")
    .insert([{ ...data, is_active: false }]) 
    .select()
    .single();

  if (error) throw error;
  return result;
}

  async findActive() {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")

      .eq("is_active", true)
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return data;
  }

  async update(id: string, data: any) {
    const { data: result, error } = await supabase
      .from("announcements")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }
  async findAll() {
    const { data, error } = await supabase.from("announcements").select("*");

    if (error) throw error;

    return data;
  }
  async delete(id: string) {
    const { data, error } = await supabase
      .from("announcements")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async isActive(id: any) {
    console.log("isActive called with id:", id); // ← اضافه کن

    const { data, error } = await supabase.rpc("set_active_announcement", {
      announcement_id: Number(id),
    });

    console.log("rpc result:", data, "error:", error); // ← اضافه کن

    if (error) throw error;
    return data;
  }
}
