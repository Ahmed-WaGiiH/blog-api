import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger";
import router from "./routes/index";
import errorHandler from "./middlewares/errorHandler";
import AppError from "./utils/AppError";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Sanitize request body
app.use((req, res, next) => {
  if (req.body) {
    const sanitize = (obj: Record<string, any>) => {
      for (const key in obj) {
        if (typeof obj[key] === "string") {
          obj[key] = obj[key].replace(/[$<>]/g, "");
        } else if (typeof obj[key] === "object") {
          sanitize(obj[key]);
        }
      }
    };
    sanitize(req.body);
  }
  next();
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ message: "Blog API is running" });
});

app.use("/api/v1", router);

// 404 handler
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`Docs available at http://localhost:${PORT}/api-docs`);
});
