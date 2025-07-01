import express from "express";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./db";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? "connected" : dbState === 2 ? "connecting" : dbState === 0 ? "disconnected" : "disconnecting";
  res.status(200).json({ status: "ok", db: dbStatus });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}); 