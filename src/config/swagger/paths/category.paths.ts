import { CategoryBody } from "../schemas/category.schema";
import { messageResponse } from "../responses/common.responses";
import {
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  serverErrorResponse,
} from "../responses/common.responses";

export const categoryPaths = {
  "/v1/category": {
    get: {
      tags: ["Categories"],
      summary: "Get all categories",
      responses: {
        200: {
          description: "Categories list",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Category",
                },
              },
            },
          },
        },
        500: serverErrorResponse,
      },
    },

    post: {
      tags: ["Categories"],
      summary: "Create category",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: CategoryBody,
          },
        },
      },
      responses: {
        201: messageResponse,
        401: unauthorizedResponse,
        403: forbiddenResponse,
        500: serverErrorResponse,
      },
    },
  },

  "/v1/category/{id}": {
    put: {
      tags: ["Categories"],
      summary: "Update category",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Category ID",
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: CategoryBody,
          },
        },
      },
      responses: {
        200: messageResponse,
        401: unauthorizedResponse,
        403: forbiddenResponse,
        404: notFoundResponse,
        500: serverErrorResponse,
      },
    },

    delete: {
      tags: ["Categories"],
      summary: "Delete category",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Category ID",
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      responses: {
        200: messageResponse,
        401: unauthorizedResponse,
        403: forbiddenResponse,
        404: notFoundResponse,
        500: serverErrorResponse,
      },
    },
  },
};