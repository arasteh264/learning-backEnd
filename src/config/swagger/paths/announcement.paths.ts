import { messageResponse } from "../responses/common.responses";
import { AnnouncementSchema } from "../schemas/announcement.schema";

export const announcementPaths = {
  "/v1/announcement": {
    post: {
      tags: ["Announcements"],
      summary: "Create announcement",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: AnnouncementSchema,
          },
        },
      },
      responses: {
        201: {
          description: "Announcement created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "بنر با موفقیت ایجاد شد",
                  },
                  Announcement: {
                    $ref: "#/components/schemas/Announcement",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Server error",
        },
      },
    },

    get: {
      tags: ["Announcements"],
      summary: "Get all announcements",
      responses: {
        200: {
          description: "List of announcements",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Announcement",
                },
              },
            },
          },
        },
        500: {
          description: "Server error",
        },
      },
    },
  },
  "/v1/announcement/active": {
    get: {
      tags: ["Announcements"],
      summary: "Get active announcement",
      description: "Returns the currently active announcement",

      responses: {
        200: {
          description: "Active announcement",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Announcement",
              },
            },
          },
        },

        404: {
          description: "No active announcement found",
        },

        500: {
          description: "Server error",
        },
      },
    },
  },
  "/v1/announcement/{id}": {
    put: {
      tags: ["Announcements"],
      summary: "Update announcement",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Announcement ID",
          schema: {
            type: "integer",
            example: 1,
          },
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                text: {
                  type: "string",
                  example: "متن جدید اطلاعیه",
                },
                end_date: {
                  type: "string",
                  format: "date-time",
                  nullable: true,
                },
              },
            },
          },
        },
      },

      responses: {
        200: messageResponse,
        500: {
          description: "Server error",
        },
      },
    },

    delete: {
      tags: ["Announcements"],
      summary: "Delete announcement",

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Announcement ID",
          schema: {
            type: "integer",
            example: 1,
          },
        },
      ],

      responses: {
        200: messageResponse,
        500: {
          description: "Server error",
        },
      },
    },
  },

  "/v1/announcement/{id}/status": {
    patch: {
      tags: ["Announcements"],
      summary: "Set active announcement",

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Announcement ID",
          schema: {
            type: "integer",
            example: 1,
          },
        },
      ],

      responses: {
        200: {
          description: "Status updated",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "وضعیت بنر تغییر کرد",
                  },
                  Announcement: {
                    $ref: "#/components/schemas/Announcement",
                  },
                },
              },
            },
          },
        },

        500: {
          description: "Server error",
        },
      },
    },
  },
};
