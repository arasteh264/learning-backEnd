export const sliderPaths = {
  "/v1/slider": {
    get: {
      tags: ["Slider"],
      summary: "دریافت همه اسلایدرها",
      responses: {
        200: {
          description: "لیست اسلایدرها",
          content: {
            "application/json": {
              schema: { type: "array", items: { $ref: "#/components/schemas/Slider" } },
            },
          },
        },
      },
    },
post: {
  tags: ["Slider"],
  summary: "ایجاد اسلایدر جدید",
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            image: { type: "string", format: "binary" }, 
            title: { type: "string", example: "دوره پایتون" },
            link: { type: "string", example: "/courses/python" },
            order: { type: "integer", example: 1 },
          },
          required: ["image", "title"],
        },
      },
    },
  },
  responses: {
    201: { description: "اسلایدر ایجاد شد" },
  },
},
  },
  "/v1/slider/{id}": {
    get: {
      tags: ["Slider"],
      summary: "دریافت اسلایدر با آیدی",
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
      responses: {
        200: { description: "اسلایدر" },
      },
    },
    put: {
      tags: ["Slider"],
      summary: "ویرایش اسلایدر",
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
      responses: {
        200: { description: "اسلایدر ویرایش شد" },
      },
    },
    delete: {
      tags: ["Slider"],
      summary: "حذف اسلایدر",
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
      responses: {
        200: { description: "اسلایدر حذف شد" },
      },
    },
  },
};