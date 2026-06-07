import { AuthRegisterBody, AuthLoginBody } from "../schemas/auth.schema";
import { messageResponse } from "../responses/common.responses";

export const authPaths = {
  "/v1/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Register a new user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: AuthRegisterBody,
          },
        },
      },
      responses: {
        201: messageResponse,
      },
    },
  },

  "/v1/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: AuthLoginBody,
          },
        },
      },
      responses: {
        200: messageResponse,
      },
    },
  },
};