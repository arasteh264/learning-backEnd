import supabase from "../../config/supabase";
import { AnnouncementRepository } from "../../domain/repositories/AnnouncementRepository";

export class SupabaseAnnouncementRepository implements AnnouncementRepository {
  async create(data: any) {
    console.log("SupabaseAnnouncementRepository");

    const { data: result, error } = await supabase
      .from("announcements")
      .insert([data])
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
      .select("*");

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
  async isActive(id: string) {
    await supabase
      .from("announcements")
      .update({ is_active: false })
      .eq("is_active", true);

    const { data, error } = await supabase
      .from("announcements")
      .update({ is_active: true })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }
}
