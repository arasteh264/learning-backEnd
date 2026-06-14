export const ArticleSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    title: { type: "string" },
    slug: { type: "string" },
    summary: { type: "string", nullable: true },
    content: { type: "string" },
    cover: { type: "string", nullable: true },
    category: { type: "string", format: "uuid" },
    author: { type: "string", format: "uuid" },
    status: { type: "string", enum: ["draft", "published"] },
    views: { type: "integer" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
  },
};

export const ArticleMultipartSchema = {
  type: "object",
  required: ["title", "content", "status"],
  properties: {
    title: { type: "string" },
    slug: { type: "string" },
    summary: { type: "string" },
    content: { type: "string" },
    status: { type: "string", enum: ["draft", "published"] },
    category: { type: "string", format: "uuid" },
    author: { type: "string", format: "uuid" },
    cover: { type: "string", format: "binary" },
  },
};