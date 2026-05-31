const swaggerJsdoc = require("swagger-jsdoc");

const uuidParam = (name, description) => ({
  name,
  in: "path",
  required: true,
  description,
  schema: {
    type: "string",
    format: "uuid",
  },
});

const messageResponse = {
  description: "Message response",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/MessageResponse",
      },
    },
  },
};

const unauthorizedResponse = {
  description: "Unauthorized or invalid token",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/MessageResponse",
      },
    },
  },
};

const forbiddenResponse = {
  description: "Access denied",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/MessageResponse",
      },
    },
  },
};

const notFoundResponse = {
  description: "Resource not found",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/MessageResponse",
      },
    },
  },
};

const serverErrorResponse = {
  description: "Server error",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/MessageResponse",
      },
    },
  },
};

const courseMultipartSchema = {
  type: "object",
  required: [
    "name",
    "description",
    "support",
    "href",
    "price",
    "status",
    "discount",
    "category",
    "creator",
    "cover",
  ],
  properties: {
    name: { type: "string", example: "Node.js Expert" },
    description: { type: "string", example: "Complete backend course" },
    support: { type: "string", example: "Telegram group" },
    href: { type: "string", example: "nodejs-expert" },
    price: { type: "integer", example: 1200000 },
    status: { type: "string", example: "start" },
    discount: { type: "integer", example: 20 },
    category: { type: "string", format: "uuid" },
    creator: { type: "string", format: "uuid" },
    cover: {
      type: "string",
      format: "binary",
      description: "Course cover image file",
    },
  },
};

const sessionMultipartSchema = {
  type: "object",
  required: ["title", "time", "free", "video"],
  properties: {
    title: { type: "string", example: "Introduction" },
    time: { type: "string", example: "12:30" },
    free: {
      oneOf: [{ type: "boolean" }, { type: "string", enum: ["0", "1"] }],
      example: "1",
    },
    course: {
      type: "string",
      format: "uuid",
      description: "Required when updating a session",
    },
    video: {
      type: "string",
      format: "binary",
      description: "Session video file",
    },
  },
};

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sabzlearn API",
      version: "1.0.0",
      description: "OpenAPI documentation for Sabzlearn backend APIs.",
    },
    servers: [
      {
        url: "http://localhost:3300",
        description: "Local development server",
      },
    ],
    tags: [
      { name: "Health", description: "Application health checks" },
      { name: "Auth", description: "Authentication endpoints" },
      { name: "Users", description: "User management endpoints" },
      { name: "Categories", description: "Course category endpoints" },
      { name: "Courses", description: "Course endpoints" },
      { name: "Sessions", description: "Course session endpoints" },
      { name: "Teachers", description: "Teacher endpoints" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        MessageResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Operation completed" },
          },
        },
        AuthRegisterBody: {
          type: "object",
          required: ["userName", "name", "email", "password", "phone"],
          properties: {
            userName: { type: "string", example: "ali_dev" },
            name: { type: "string", example: "Ali Ahmadi" },
            email: { type: "string", format: "email", example: "ali@example.com" },
            password: { type: "string", format: "password", example: "12345678" },
            phone: { type: "string", example: "09123456789" },
          },
        },
        AuthLoginBody: {
          type: "object",
          required: ["identifier", "password"],
          properties: {
            identifier: {
              type: "string",
              description: "Email or username",
              example: "ali@example.com",
            },
            password: { type: "string", format: "password", example: "12345678" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            accessToken: { type: "string" },
            user: { $ref: "#/components/schemas/User" },
            message: { type: "string" },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            userName: { type: "string" },
            username: { type: "string" },
            name: { type: "string" },
            email: { type: "string", format: "email" },
            phone: { type: "string" },
            role: { type: "string", enum: ["ADMIN", "USER"] },
            banStatus: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
            created_at: { type: "string", format: "date-time" },
          },
        },
        UpdateUserBody: {
          type: "object",
          properties: {
            name: { type: "string", example: "Ali Ahmadi" },
            userName: { type: "string", example: "ali_dev" },
            email: { type: "string", format: "email", example: "ali@example.com" },
            phone: { type: "string", example: "09123456789" },
            password: { type: "string", format: "password", example: "new-password" },
          },
        },
        Category: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            title: { type: "string", example: "Backend" },
            href: { type: "string", example: "backend" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        CategoryBody: {
          type: "object",
          required: ["title", "href"],
          properties: {
            title: { type: "string", example: "Backend" },
            href: { type: "string", example: "backend" },
          },
        },
        Course: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string" },
            description: { type: "string" },
            support: { type: "string" },
            href: { type: "string" },
            price: { type: "integer" },
            status: { type: "string" },
            discount: { type: "integer" },
            category: { type: "string" },
            creator: { type: "string" },
            cover: { type: "string", nullable: true },
            sessionCount: { type: "integer" },
          },
        },
        Session: {
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
        },
        Teacher: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            userId: { type: "string", format: "uuid" },
            name: { type: "string" },
            email: { type: "string", format: "email" },
            bio: { type: "string" },
            expertise: {
              type: "array",
              items: { type: "string" },
            },
            courses: {
              type: "array",
              items: { type: "string" },
            },
            rating: { type: "number" },
            isVerified: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        TeacherBody: {
          type: "object",
          required: ["bio", "expertise"],
          properties: {
            userId: {
              type: "string",
              format: "uuid",
              description: "Required for admin teacher creation",
            },
            bio: { type: "string", example: "Backend developer and instructor" },
            expertise: {
              oneOf: [
                { type: "array", items: { type: "string" } },
                { type: "string", example: "nodejs,express,supabase" },
              ],
            },
          },
        },
      },
    },
    paths: {
      "/": {
        get: {
          tags: ["Health"],
          summary: "Check API health",
          responses: {
            200: {
              description: "Application is running",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "ok" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/v1/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthRegisterBody" },
              },
            },
          },
          responses: {
            201: {
              description: "User registered",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuthResponse" },
                },
              },
            },
            403: forbiddenResponse,
            409: messageResponse,
            500: serverErrorResponse,
          },
        },
      },
      "/v1/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login with email or username",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthLoginBody" },
              },
            },
          },
          responses: {
            200: {
              description: "Login successful",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuthResponse" },
                },
              },
            },
            401: unauthorizedResponse,
            500: serverErrorResponse,
          },
        },
      },
      "/v1/users": {
        get: {
          tags: ["Users"],
          summary: "Get all users",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Users list",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
            401: unauthorizedResponse,
            403: forbiddenResponse,
            500: serverErrorResponse,
          },
        },
        put: {
          tags: ["Users"],
          summary: "Update current user",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateUserBody" },
              },
            },
          },
          responses: {
            200: messageResponse,
            401: unauthorizedResponse,
            404: notFoundResponse,
            500: serverErrorResponse,
          },
        },
      },
      "/v1/users/profile": {
        get: {
          tags: ["Users"],
          summary: "Get current user profile",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Current user profile",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
            401: unauthorizedResponse,
            404: notFoundResponse,
            500: serverErrorResponse,
          },
        },
      },
      "/v1/users/role/{id}": {
        put: {
          tags: ["Users"],
          summary: "Toggle user role",
          security: [{ bearerAuth: [] }],
          parameters: [uuidParam("id", "User ID")],
          responses: {
            200: messageResponse,
            401: unauthorizedResponse,
            403: forbiddenResponse,
            404: notFoundResponse,
            500: serverErrorResponse,
          },
        },
      },
      "/v1/users/{id}": {
        delete: {
          tags: ["Users"],
          summary: "Delete a user",
          parameters: [uuidParam("id", "User ID")],
          responses: {
            200: messageResponse,
            404: notFoundResponse,
            500: serverErrorResponse,
          },
        },
      },
      "/v1/users/ban/{id}": {
        post: {
          tags: ["Users"],
          summary: "Ban or unban a user",
          security: [{ bearerAuth: [] }],
          parameters: [uuidParam("id", "User ID")],
          responses: {
            200: {
              description: "Ban status changed",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      banStatus: { type: "boolean" },
                    },
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
      },
      "/v1/category": {
        get: {
          tags: ["Categories"],
          summary: "Get all categories",
          responses: {
            200: {
              description: "Categories list",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Category" },
                  },
                },
              },
            },
            500: serverErrorResponse,
          },
        },
        post: {
          tags: ["Categories"],
          summary: "Create a category",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CategoryBody" },
              },
            },
          },
          responses: {
            201: messageResponse,
            401: unauthorizedResponse,
            403: forbiddenResponse,
            500: serverErrorResponse,
          },
        },
      },
      "/v1/category/{id}": {
        put: {
          tags: ["Categories"],
          summary: "Update a category",
          security: [{ bearerAuth: [] }],
          parameters: [uuidParam("id", "Category ID")],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CategoryBody" },
              },
            },
          },
          responses: {
            200: messageResponse,
            401: unauthorizedResponse,
            403: forbiddenResponse,
            404: notFoundResponse,
            500: serverErrorResponse,
          },
        },
        delete: {
          tags: ["Categories"],
          summary: "Delete a category",
          security: [{ bearerAuth: [] }],
          parameters: [uuidParam("id", "Category ID")],
          responses: {
            200: messageResponse,
            401: unauthorizedResponse,
            403: forbiddenResponse,
            404: notFoundResponse,
            500: serverErrorResponse,
          },
        },
      },
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
                    items: { $ref: "#/components/schemas/Course" },
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
                schema: courseMultipartSchema,
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
          parameters: [uuidParam("id", "Course ID")],
          responses: {
            200: {
              description: "Course detail",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Course" },
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
          parameters: [uuidParam("id", "Course ID")],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: courseMultipartSchema,
              },
            },
          },
          responses: {
            200: messageResponse,
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
          parameters: [uuidParam("id", "Course ID")],
          responses: {
            200: messageResponse,
            401: unauthorizedResponse,
            403: forbiddenResponse,
            404: notFoundResponse,
            500: serverErrorResponse,
          },
        },
      },
      "/v1/course/{id}/session": {
        post: {
          tags: ["Sessions"],
          summary: "Create a session for a course",
          security: [{ bearerAuth: [] }],
          parameters: [uuidParam("id", "Course ID")],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: sessionMultipartSchema,
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
                    items: { $ref: "#/components/schemas/Session" },
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
          parameters: [uuidParam("id", "Session ID")],
          responses: {
            200: {
              description: "Session detail",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Session" },
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
          parameters: [uuidParam("id", "Session ID")],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: sessionMultipartSchema,
              },
            },
          },
          responses: {
            200: messageResponse,
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
          parameters: [uuidParam("id", "Session ID")],
          responses: {
            200: messageResponse,
            401: unauthorizedResponse,
            403: forbiddenResponse,
            404: notFoundResponse,
            500: serverErrorResponse,
          },
        },
      },
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
                    items: { $ref: "#/components/schemas/Teacher" },
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
          summary: "Create a teacher by admin",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/TeacherBody" },
                    {
                      type: "object",
                      required: ["userId"],
                    },
                  ],
                },
              },
            },
          },
          responses: {
            201: messageResponse,
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
                schema: { $ref: "#/components/schemas/TeacherBody" },
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
          parameters: [uuidParam("id", "Teacher ID")],
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
          summary: "Get expertise list",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Expertise list",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { type: "string" },
                    example: ["react", "nodejs", "mongodb", "typescript", "nextjs"],
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
                        items: { $ref: "#/components/schemas/Teacher" },
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
          parameters: [uuidParam("id", "Teacher ID")],
          responses: {
            200: messageResponse,
            401: unauthorizedResponse,
            403: forbiddenResponse,
            404: notFoundResponse,
            500: serverErrorResponse,
          },
        },
      },
    },
  },
  apis: [],
};

module.exports = swaggerJsdoc(options);
