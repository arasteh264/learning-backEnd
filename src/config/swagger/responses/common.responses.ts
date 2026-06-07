export const messageResponse = {
  description: "Message response",
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/MessageResponse" },
    },
  },
};

export const unauthorizedResponse = {
  description: "Unauthorized or invalid token",
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/MessageResponse" },
    },
  },
};

export const forbiddenResponse = {
  description: "Access denied",
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/MessageResponse" },
    },
  },
};

export const notFoundResponse = {
  description: "Resource not found",
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/MessageResponse" },
    },
  },
};

export const serverErrorResponse = {
  description: "Server error",
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/MessageResponse" },
    },
  },
};