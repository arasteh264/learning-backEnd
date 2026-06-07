export const AuthRegisterBody = {
  type: "object",
  required: ["userName", "name", "email", "password", "phone"],
  properties: {
    userName: { type: "string" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string", format: "password" },
    phone: { type: "string" },
  },
};

export const AuthLoginBody = {
  type: "object",
  required: ["identifier", "password"],
  properties: {
    identifier: { type: "string" },
    password: { type: "string", format: "password" },
  },
};