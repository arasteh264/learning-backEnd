import supabase from "../../config/supabase";
import { SessionRepository } from "../../domain/repositories/SessionRepository";

export class SupabaseSessionRepository implements SessionRepository {

  async create(data: any) {
    const { data: result, error } = await supabase
      .from("sessions")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("sessions")
      .select(`
        *,
        courses (id, name)
      `);

    if (error) throw error;
    return data;
  }

  async findById(id: string) {
    const { data, error } = await supabase
      .from("sessions")
      .select(`
        *,
        courses (id, name)
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, data: any) {
    const { data: result, error } = await supabase
      .from("sessions")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async delete(id: string) {
    const { data, error } = await supabase
      .from("sessions")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteByCourseId(courseId: string) {
    const { error } = await supabase
      .from("sessions")
      .delete()
      .eq("course_id", courseId);

    if (error) throw error;
  }
}