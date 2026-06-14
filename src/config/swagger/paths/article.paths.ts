import { ArticleMultipartSchema } from "../schemas/article.schema";
import { messageResponse } from "../responses/common.responses";
import {
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  serverErrorResponse,
} from "../responses/common.responses";
import { uuidParam } from "../base";

export const articlePaths = {
  "/v1/article": {
    get: {
      tags: ["Articles"],
      summary: "Get all articles",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "status",
          in: "query",
          required: false,
          description: "Filter by status (draft or published)",
          schema: { type: "string", enum: ["draft", "published"] },
        },
      ],
      responses: {
        200: {
          description: "Articles list",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Article" },
              },
            },
          },
        },
        401: unauthorizedResponse,
        403: forbiddenResponse,
        500: serverErrorResponse,
      },
    },

    post: {
      tags: ["Articles"],
      summary: "Create an article",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: ArticleMultipartSchema,
          },
        },
      },
      responses: {
        201: messageResponse,
        400: messageResponse,
        401: unauthorizedResponse,
        403: forbiddenResponse,
        500: serverErrorResponse,
      },
    },
  },

  "/v1/article/{slug}": {
    get: {
      tags: ["Articles"],
      summary: "Get article detail by slug",
      parameters: [
        {
          name: "slug",
          in: "path",
          required: true,
          description: "Article slug",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Article detail",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Article" },
            },
          },
        },
        404: notFoundResponse,
        500: serverErrorResponse,
      },
    },
  },

  "/v1/article/{id}": {
    put: {
      tags: ["Articles"],
      summary: "Update an article",
      security: [{ bearerAuth: [] }],
      parameters: [uuidParam("id", "Article ID")],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: ArticleMultipartSchema,
          },
        },
      },
      responses: {
        200: messageResponse,
        400: messageResponse,
        401: unauthorizedResponse,
        403: forbiddenResponse,
        404: notFoundResponse,
        500: serverErrorResponse,
      },
    },

    delete: {
      tags: ["Articles"],
      summary: "Delete an article",
      security: [{ bearerAuth: [] }],
      parameters: [uuidParam("id", "Article ID")],
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