export const RequestPaymentBody = {
  type: "object",
  required: ["orderId"],
  properties: {
    orderId: { type: "string", format: "uuid" },
  },
};

export const RequestPaymentResponse = {
  type: "object",
  properties: {
    free: { type: "boolean" },
    paymentUrl: { type: "string", nullable: true },
    message: { type: "string", nullable: true },
  },
};