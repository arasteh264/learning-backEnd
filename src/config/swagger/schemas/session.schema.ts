export const SessionSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    title: { type: "string" },
    time: { type: "string" },
    free: { type: "boolean" },
    course: { type: "string", format: "uuid" },
    courseName: { type: "string" },
    video: { type: "string" },
  },
};

export const SessionMultipartSchema = {
  type: "object",
  required: ["title", "time", "free", "video"],
  properties: {
    title: { type: "string" },
    time: { type: "string" },
    free: {
      oneOf: [{ type: "boolean" }, { type: "string", enum: ["0", "1"] }],
    },
    course: { type: "string", format: "uuid" },
    video: { type: "string", format: "binary" },
  },
};