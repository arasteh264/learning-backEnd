export const CartItemSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    course_id: { type: "string", format: "uuid" },
    courses: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        cover: { type: "string" },
        href: { type: "string" },
        price: { type: "integer" },
        discount: { type: "integer" },
      },
    },
  },
};

export const CartSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    items: {
      type: "array",
      items: { $ref: "#/components/schemas/CartItem" },
    },
    total: { type: "integer" },
    count: { type: "integer" },
  },
};

export const AddToCartBody = {
  type: "object",
  required: ["courseId"],
  properties: {
    courseId: { type: "string", format: "uuid" },
  },
};