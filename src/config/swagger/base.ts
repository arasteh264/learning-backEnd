const baseUrl = process.env.BASE_URL;
export const baseSwagger = {
  openapi: "3.0.0",
  info: {
    title: "Sabzlearn API",
    version: "1.0.0",
    description: "OpenAPI documentation for Sabzlearn backend APIs.",
  },
  servers: [
    {
      url: baseUrl,
      description: "Local development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
export const uuidParam = (name: string, description: string) => ({
  name,
  in: "path",
  required: true,
  description,
  schema: {
    type: "string",
    format: "uuid",
  },
});
