export const SliderSchema = {
  type: "object",
  properties: {
    id: { type: "integer", example: 1 },
    title: { type: "string", example: "دوره پایتون" },
    link: { type: "string", example: "/courses/python" },
    image_url: { type: "string", example: "https://..." },
    is_active: { type: "boolean", example: true },
    order: { type: "integer", example: 1 },
    created_at: { type: "string", example: "2026-06-10T00:00:00.000Z" },
  },
};