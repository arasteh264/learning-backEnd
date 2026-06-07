export const UserSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    userName: { type: "string" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
    phone: { type: "string" },
    role: { type: "string", enum: ["ADMIN", "USER"] },
  },
};