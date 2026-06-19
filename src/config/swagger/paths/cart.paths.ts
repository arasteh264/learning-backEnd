import { AddToCartBody } from "../schemas/cart.schema";
import { messageResponse } from "../responses/common.responses";
import {
  unauthorizedResponse,
  forbiddenResponse,
  serverErrorResponse,
} from "../responses/common.responses";

export const cartPaths = {
  "/v1/cart": {
    get: {
      tags: ["Cart"],
      summary: "Get current user's cart",
      description: "دریافت سبد خرید کاربر لاگین‌کرده به همراه جزئیات هر دوره و مبلغ نهایی.",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Cart with items",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cart" },
            },
          },
        },
        401: unauthorizedResponse,
        403: forbiddenResponse,
        500: serverErrorResponse,
      },
    },
  },

  "/v1/cart/items": {
    post: {
      tags: ["Cart"],
      summary: "Add a course to cart",
      description: "افزودن یک دوره به سبد خرید کاربر. اگر دوره قبلاً در سبد باشد، خطا برمی‌گرداند.",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": { schema: AddToCartBody },
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

  "/v1/cart/items/{courseId}": {
    delete: {
      tags: ["Cart"],
      summary: "Remove a course from cart",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "courseId",
          in: "path",
          required: true,
          description: "شناسه دوره‌ای که باید از سبد حذف شود",
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: {
        200: messageResponse,
        400: messageResponse,
        401: unauthorizedResponse,
        403: forbiddenResponse,
        500: serverErrorResponse,
      },
    },
  },
};