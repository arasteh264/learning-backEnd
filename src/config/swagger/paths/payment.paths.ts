import { RequestPaymentBody, RequestPaymentResponse } from "../schemas/payment.schema";
import { messageResponse } from "../responses/common.responses";
import {
  unauthorizedResponse,
  forbiddenResponse,
  serverErrorResponse,
} from "../responses/common.responses";

export const paymentPaths = {
  "/v1/payment/request": {
    post: {
      tags: ["Payment"],
      summary: "Request payment for an order",
      description:
        "درخواست پرداخت برای یک سفارش. اگر مبلغ سفارش صفر باشد (دوره رایگان)، مستقیماً تأیید می‌شود و نیازی به اتصال به درگاه نیست.",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: RequestPaymentBody,
          },
        },
      },
      responses: {
        200: {
          description: "Payment URL or free confirmation",
          content: {
            "application/json": {
              schema: RequestPaymentResponse,
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

  "/v1/payment/verify": {
    get: {
      tags: ["Payment"],
      summary: "Verify payment callback from gateway",
      description:
        "این مسیر توسط درگاه پرداخت (زرین‌پال) فراخوانی می‌شود، نه توسط فرانت‌اند مستقیماً. کاربر پس از پرداخت به این آدرس هدایت می‌شود و سپس به صفحه نتیجه در فرانت ریدایرکت می‌گردد. این endpoint نیازی به احراز هویت ندارد.",
      parameters: [
        {
          name: "Authority",
          in: "query",
          required: true,
          description: "کد یکتای تراکنش که از درگاه پرداخت دریافت شده",
          schema: { type: "string" },
        },
        {
          name: "Status",
          in: "query",
          required: true,
          description: "وضعیت بازگشتی از درگاه (OK یا NOK)",
          schema: { type: "string", enum: ["OK", "NOK"] },
        },
      ],
      responses: {
        302: {
          description:
            "Redirect to frontend success or failure page",
        },
        500: serverErrorResponse,
      },
    },
  },
};