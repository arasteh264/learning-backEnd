import supabase from "../../config/supabase";
import { AnnouncementRepository } from "../../domain/repositories/AnnouncementRepository";

export class SupabaseAnnouncementRepository implements AnnouncementRepository {

  async create(data: any) {
    const { data: result, error } = await supabase
      .from("Announcement")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("Announcement")
      .select("*");

    if (error) throw error;
    return data;
  }

  async update(id: string, data: any) {
    const { data: result, error } = await supabase
      .from("Announcement")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async delete(id: string) {
    const { data, error } = await supabase
      .from("Announcement")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
  async isActive(id:string){

  }
}