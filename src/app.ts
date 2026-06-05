import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

// routes
import authRouter from "./main/routes/authRoutes";
import userRouter from "./main/routes/userRoutes";
import categoryRouter from "./main/routes/categoryRoutes";
import courseRouter from "./main/routes/courseRoutes";
import teacherRouter from "./main/routes/teacherRoutes";
import sessionRouter from "./main/routes/sessionRoutes";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// swagger
app.get("/api-docs.json", (_req, res) => res.json(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes only wiring
app.use("/v1/auth", authRouter);
app.use("/v1/users", userRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/course", courseRouter);
app.use("/v1/teacher", teacherRouter);
app.use("/v1/session", sessionRouter);
export default app;