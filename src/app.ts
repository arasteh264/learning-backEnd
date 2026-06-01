import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import cors from "cors";
import path from "path";

// Routes
import authRouter from "./routes/v1/auth";
import userRouter from "./routes/v1/user";
import categoryRouter from "./routes/v1/category";
import courseRouter from "./routes/v1/course";
import commentRouter from "./routes/v1/comment";
import teacherRouter from "./routes/v1/teacher";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger
app.get("/api-docs.json", (_req, res) => res.json(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/v1/auth", authRouter);
app.use("/v1/users", userRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/course", courseRouter);
app.use("/v1/comment", commentRouter);
app.use("/v1/teacher", teacherRouter);

export default app;