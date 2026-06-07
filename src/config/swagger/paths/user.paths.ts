import { UserSchema } from "../schemas/user.schema";
import { messageResponse } from "../responses/common.responses";

export const userPaths = {
  "/v1/users": {
    get: {
      tags: ["Users"],
      summary: "Get all users",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Users list",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
        401: { description: "Unauthorized" },
        403: { description: "Forbidden" },
        500: { description: "Server error" },
      },
    },

    put: {
      tags: ["Users"],
      summary: "Update current user",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: UserSchema,
          },
        },
      },
      responses: {
        200: messageResponse,
        401: { description: "Unauthorized" },
        404: { description: "User not found" },
        500: { description: "Server error" },
      },
    },
  },

  "/v1/users/profile": {
    get: {
      tags: ["Users"],
      summary: "Get current user profile",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "User profile",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        401: { description: "Unauthorized" },
        404: { description: "Not found" },
        500: { description: "Server error" },
      },
    },
  },

  "/v1/users/role/{id}": {
    put: {
      tags: ["Users"],
      summary: "Toggle user role",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "User ID",
        },
      ],
      responses: {
        200: messageResponse,
        401: { description: "Unauthorized" },
        403: { description: "Forbidden" },
        404: { description: "Not found" },
        500: { description: "Server error" },
      },
    },
  },

  "/v1/users/{id}": {
    delete: {
      tags: ["Users"],
      summary: "Delete user",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "User ID",
        },
      ],
      responses: {
        200: messageResponse,
        404: { description: "Not found" },
        500: { description: "Server error" },
      },
    },
  },

  "/v1/users/ban/{id}": {
    post: {
      tags: ["Users"],
      summary: "Ban or unban user",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
          description: "User ID",
        },
      ],
      responses: {
        200: {
          description: "Ban status updated",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  banStatus: { type: "boolean" },
                },
              },
            },
          },
        },
        401: { description: "Unauthorized" },
        403: { description: "Forbidden" },
        404: { description: "Not found" },
        500: { description: "Server error" },
      },
    },
  },
};