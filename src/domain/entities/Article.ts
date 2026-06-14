export interface Article {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  content: string;
  cover?: string;
  category_id?: string;
  author_id?: string;
  status: "draft" | "published";
  views: number;
  created_at: string;
  updated_at: string;
}