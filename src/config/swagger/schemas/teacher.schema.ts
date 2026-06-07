export const TeacherSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    userId: { type: "string", format: "uuid" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
    bio: { type: "string" },
    expertise: { type: "array", items: { type: "string" } },
    courses: { type: "array", items: { type: "string" } },
    rating: { type: "number" },
    isVerified: { type: "boolean" },
  },
};

export const TeacherBody = {
  type: "object",
  required: ["bio", "expertise"],
  properties: {
    userId: { type: "string", format: "uuid" },
    bio: { type: "string" },
    expertise: {
      oneOf: [{ type: "array", items: { type: "string" } }, { type: "string" }],
    },
  },
};
