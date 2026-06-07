import { TeacherBody } from "../schemas/teacher.schema";
import { messageResponse } from "../responses/common.responses";
import {
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  serverErrorResponse,
} from "../responses/common.responses";
import { uuidParam } from "../base";


export const teacherPaths = {
  "/v1/teacher": {
    get: {
      tags: ["Teachers"],
      summary: "Get all teachers",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Teachers list",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Teacher",
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

    post: {
      tags: ["Teachers"],
      summary: "Create a teacher",
      description: "Create teacher (admin only)",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: TeacherBody,
          },
        },
      },
      responses: {
        201: messageResponse,
        400: messageResponse,
        401: unauthorizedResponse,
        403: forbiddenResponse,
        404: notFoundResponse,
        409: messageResponse,
        500: serverErrorResponse,
      },
    },
  },

  "/v1/teacher/request": {
    post: {
      tags: ["Teachers"],
      summary: "Request to become a teacher",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: TeacherBody,
          },
        },
      },
      responses: {
        201: messageResponse,
        400: messageResponse,
        401: unauthorizedResponse,
        500: serverErrorResponse,
      },
    },
  },

  "/v1/teacher/verify/{id}": {
    post: {
      tags: ["Teachers"],
      summary: "Verify a teacher",
      security: [{ bearerAuth: [] }],
      parameters: [
        uuidParam("id", "Teacher ID"),
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

  "/v1/teacher/expertises": {
    get: {
      tags: ["Teachers"],
      summary: "Get available expertises",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Expertise list",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
        },
        401: unauthorizedResponse,
      },
    },
  },

  "/v1/teacher/verifyed": {
    get: {
      tags: ["Teachers"],
      summary: "Get verified teachers",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Verified teachers",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  count: { type: "integer" },
                  data: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Teacher",
                    },
                  },
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

  "/v1/teacher/{id}": {
    delete: {
      tags: ["Teachers"],
      summary: "Delete a teacher",
      security: [{ bearerAuth: [] }],
      parameters: [
        uuidParam("id", "Teacher ID"),
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