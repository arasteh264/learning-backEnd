export const OrderItemSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    course_id: { type: "string", format: "uuid" },
    price: { type: "integer" },
    courses: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        cover: { type: "string" },
        href: { type: "string" },
      },
    },
  },
};

export const OrderSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    userId: { type: "string", format: "uuid" },
    totalprice: { type: "integer" },
    status: {
      type: "string",
      enum: ["pending", "awaiting_payment", "paid", "failed", "cancelled"],
    },
    order_items: {
      type: "array",
      items: { $ref: "#/components/schemas/OrderItem" },
    },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
  },
};
