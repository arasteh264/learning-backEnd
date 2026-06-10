import supabase from "../../config/supabase";
import { AnnouncementRepository } from "../../domain/repositories/AnnouncementRepository";

export class SupabaseAnnouncementRepository implements AnnouncementRepository {
  async create(data: any) {
    const { data: result, error } = await supabase
      .from("announcements")
      .insert([{ is_active: false, ...data }])
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
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("is_active", { ascending: false }); 

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

    const { data, error } = await supabase.rpc("set_active_announcement", {
      announcement_id: Number(id),
    });

    console.log("rpc result:", data, "error:", error);

    if (error) throw error;
    return data;
  }
  async findById(id: string) {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }
}
