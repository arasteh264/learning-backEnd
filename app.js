const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const cors = require("cors");
const path = require("path");

const authRouter = require("./routes/v1/auth");
const userRouter = require("./routes/v1/user");
const categoryRouter = require("./routes/v1/category");
const courseRouter = require("./routes/v1/course");
const commentRouter = require("./routes/v1/comment");
const teacherRouter = require("./routes/v1/teacher");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger
app.get("/api-docs.json", (req, res) => res.json(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// Routes
app.use("/v1/auth", authRouter);
app.use("/v1/users", userRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/course", courseRouter);
app.use("/v1/comment", commentRouter);
app.use("/v1/teacher", teacherRouter);

module.exports = app;
