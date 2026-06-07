export const CategorySchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    title: { type: "string" },
    href: { type: "string" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
  },
};

export const CategoryBody = {
  type: "object",
  required: ["title", "href"],
  properties: {
    title: { type: "string" },
    href: { type: "string" },
  },
};