import supabase from "../../config/supabase";
import { ArticleRepository } from "../../domain/repositories/ArticleRepository";

export class SupabaseArticleRepository implements ArticleRepository {
  async create(data: any) {
    const { data: result, error } = await supabase
      .from("articles")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async findAll(filters?: { status?: string }) {
    let q = supabase.from("articles").select(`
      *,
      categories:category_id ( id, title ),
      teachers:author_id ( id, bio, rating, user_id )
    `).order("created_at", { ascending: false });

    if (filters?.status) {
      q = q.eq("status", filters.status);
    }

    const { data, error } = await q;
    if (error) throw error;
    return data;
  }

  async findById(id: string) {
    const { data, error } = await supabase
      .from("articles")
      .select(`
        *,
        categories:category_id ( id, title ),
        teachers:author_id ( id, bio, rating, user_id )
      `)
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  }

  async findBySlug(slug: string) {
    const { data, error } = await supabase
      .from("articles")
      .select(`
        *,
        categories:category_id ( id, title ),
        teachers:author_id ( id, bio, rating, user_id )
      `)
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error) return null;
    return data;
  }

  async update(id: string, data: any) {
    const { data: result, error } = await supabase
      .from("articles")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async delete(id: string) {
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) throw error;
  }

  async incrementViews(id: string) {
    const { error } = await supabase.rpc("increment_article_views", {
      article_id: id,
    });
    if (error) throw error;
  }
}