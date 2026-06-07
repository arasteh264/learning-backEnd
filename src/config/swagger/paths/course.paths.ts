import { CourseMultipartSchema } from "../schemas/course.schema";
import { messageResponse } from "../responses/common.responses";
import {
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  serverErrorResponse,
} from "../responses/common.responses";
import { uuidParam } from "../base";


export const coursePaths = {
  "/v1/course": {
    get: {
      tags: ["Courses"],
      summary: "Get all courses",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Courses list",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Course",
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
      tags: ["Courses"],
      summary: "Create a course",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: CourseMultipartSchema,
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

  "/v1/course/{id}": {
    get: {
      tags: ["Courses"],
      summary: "Get course detail",
      security: [{ bearerAuth: [] }],
      parameters: [
        uuidParam("id", "Course ID"),
      ],
      responses: {
        200: {
          description: "Course detail",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Course",
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

    patch: {
      tags: ["Courses"],
      summary: "Update a course",
      security: [{ bearerAuth: [] }],
      parameters: [
        uuidParam("id", "Course ID"),
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: CourseMultipartSchema,
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
      tags: ["Courses"],
      summary: "Delete a course and its sessions",
      security: [{ bearerAuth: [] }],
      parameters: [
        uuidParam("id", "Course ID"),
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