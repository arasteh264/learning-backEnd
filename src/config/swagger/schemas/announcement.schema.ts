export const AnnouncementSchema = {
  type: "object",
  properties: {
    text: {
      type: "string",
      example: "تخفیف ویژه دوره‌های بک‌اند تا پایان هفته",
    },
    end_date: {
      type: "string",
      format: "date-time",
      nullable: true,
      example: "2026-07-01T23:59:59Z",
    },
    is_active: {
      type: "boolean",
      example: true,
    },
  },
};

export const AnnouncementBody = {
  type: "object",
  required: ["text"],
  properties: {
    text: {
      type: "string",
      example: "تخفیف ویژه دوره‌های بک‌اند تا پایان هفته",
    },
    end_date: {
      type: "string",
      format: "date-time",
      nullable: true,
      example: "2026-07-01T23:59:59Z",
    },
    is_active: {
      type: "boolean",
      example: true,
    },
  },
};