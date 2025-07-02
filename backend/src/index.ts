import express from "express";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./db";
import mongoose from "mongoose";
import snippetsRouter from "./routes/snippets";
import { claudeService } from "./services/claude.service";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", async (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? "connected" : dbState === 2 ? "connecting" : dbState === 0 ? "disconnected" : "disconnecting";
  
  // Check Claude service health
  let claudeStatus = "not_configured";
  if (claudeService.isConfigured()) {
    try {
      const claudeHealthy = await claudeService.healthCheck();
      claudeStatus = claudeHealthy ? "connected" : "error";
    } catch (error) {
      claudeStatus = "error";
    }
  }

  res.status(200).json({ 
    status: "ok", 
    db: dbStatus,
    claude: claudeStatus
  });
});

// Routes
app.use("/snippets", snippetsRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}); 