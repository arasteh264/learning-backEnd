import { SessionMultipartSchema } from "../schemas/session.schema";
import { messageResponse } from "../responses/common.responses";
import {
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  serverErrorResponse,
} from "../responses/common.responses";
import { uuidParam } from "../base";


export const sessionPaths = {
  "/v1/course/{id}/session": {
    post: {
      tags: ["Sessions"],
      summary: "Create a session for a course",
      security: [{ bearerAuth: [] }],
      parameters: [
        uuidParam("id", "Course ID"),
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: SessionMultipartSchema,
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

  "/v1/course/session": {
    get: {
      tags: ["Sessions"],
      summary: "Get all sessions",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Sessions list",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Session",
                },
              },
            },
          },
        },
        401: unauthorizedResponse,
        403: forbiddenResponse,
        500: serverErrorResponse,
      },
    },
  },

  "/v1/course/session/{id}": {
    get: {
      tags: ["Sessions"],
      summary: "Get session detail",
      security: [{ bearerAuth: [] }],
      parameters: [
        uuidParam("id", "Session ID"),
      ],
      responses: {
        200: {
          description: "Session detail",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Session",
              },
            },
          },
        },
        401: unauthorizedResponse,
        403: forbiddenResponse,
        404: notFoundResponse,
        500: serverErrorResponse,
      },
    },

    put: {
      tags: ["Sessions"],
      summary: "Update a session",
      security: [{ bearerAuth: [] }],
      parameters: [
        uuidParam("id", "Session ID"),
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: SessionMultipartSchema,
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
      tags: ["Sessions"],
      summary: "Delete a session",
      security: [{ bearerAuth: [] }],
      parameters: [
        uuidParam("id", "Session ID"),
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