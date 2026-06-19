import { OrderSchema } from "../schemas/order.schema";
import { messageResponse } from "../responses/common.responses";
import {
  unauthorizedResponse,
  forbiddenResponse,
  serverErrorResponse,
} from "../responses/common.responses";

export const orderPaths = {
  "/v1/order": {
    post: {
      tags: ["Orders"],
      summary: "Create an order from the current cart",
      description:
        "تبدیل سبد خرید فعلی کاربر به سفارش. بعد از ساخت سفارش، سبد خرید خالی می‌شود.",
      security: [{ bearerAuth: [] }],
      responses: {
        201: {
          description: "Order created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  order: { $ref: "#/components/schemas/Order" },
                },
              },
            },
          },
        },
        400: messageResponse,
        401: unauthorizedResponse,
        403: forbiddenResponse,
        500: serverErrorResponse,
      },
    },
  },
};