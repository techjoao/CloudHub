import "dotenv/config";
import express from "express";
import cors from "cors";
import { healthRouter } from "./routes/health.js";
import { dashboardRouter } from "./routes/dashboard.js";

const app = express();
const port = Number(process.env.PORT ?? 3001);
const webOrigin = process.env.WEB_ORIGIN ?? "http://localhost:5173";

app.use(cors({ origin: webOrigin }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/v1/health", healthRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.listen(port, "0.0.0.0", () => {
  console.log(`CloudHub API running at http://localhost:${port}`);
});