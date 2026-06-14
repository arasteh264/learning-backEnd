import supabase from "../../config/supabase";
import { CourseRepository } from "../../domain/repositories/CourseRepository";

export class SupabaseCourseRepository implements CourseRepository {
  async create(data: any) {
    const { data: result, error } = await supabase
      .from("courses")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async findAll() {
    const { data, error } = await supabase.from("courses").select(`
        *,
        teachers:creator_id (
          id,
          bio,
          rating,
          user_id
        ),
        categories:category_id (
          id,
          title
        )
      `);

    if (error) {
      throw error;
    }

    return data;
  }

  async findById(id: string) {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  }

  async update(id: string, data: any) {
    const { data: result, error } = await supabase
      .from("courses")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async delete(id: string) {
    const { error } = await supabase.from("courses").delete().eq("id", id);

    if (error) throw error;
  }
  async search(query: string) {
    const words = query.split(/\s+/).filter(Boolean);

    let q = supabase.from("courses").select(`
    *,
    teachers:creator_id ( id, bio, rating, user_id ),
    categories:category_id ( id, title )
  `);

    words.forEach((word) => {
      q = q.or(`name.ilike.%${word}%,description.ilike.%${word}%`);
    });

    const { data, error } = await q;
    if (error) throw error;
    return data;
  }
  
async findLatest(limit: number = 8) {
  const { data, error } = await supabase
    .from("courses")
    .select(`
      *,
      teachers:creator_id ( id, bio, rating, user_id ),
      categories:category_id ( id, title )
    `)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
}

