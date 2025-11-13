import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"; // we'll make this next

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // <— 3001 to avoid conflicts

app.use(express.json());

// allow your Vite dev site on 5173
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// quick health check
app.get("/health", (_req, res) => res.send("ok"));

// mount /api routes (e.g., /api/signup)
app.use("/api", authRoutes);

// error handler
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Server error" });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
