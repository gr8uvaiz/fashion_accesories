import express, { Application, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import profileRoutes from "./routes/profileRoutes";

const app: Application = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://fashion-accesories-hqbq.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json({ limit: "50mb" })); // Increased limit for base64 images
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "Fashion Accessories API is running",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Fashion Accessories API v1.0" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/profile", profileRoutes);

export default app;
