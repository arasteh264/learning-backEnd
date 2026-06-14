export interface ArticleRepository {
  create(data: any): Promise<any>;
  findAll(filters?: { status?: string }): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  findBySlug(slug: string): Promise<any | null>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<void>;
  incrementViews(id: string): Promise<void>;
}