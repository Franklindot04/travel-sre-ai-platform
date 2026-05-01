import client from "prom-client";
import { createMetrics } from "../shared/metrics";
import { startWorkerLoop } from "./worker";

const { register, httpRequestCounter, httpRequestDuration } = createMetrics(
  "ai-sre-agent",
  client
);

import express from "express";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;

    httpRequestCounter.inc({
      service: "ai-sre-agent",
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });

    httpRequestDuration.observe(
      {
        service: "ai-sre-agent",
        method: req.method,
        route: req.path,
      },
      duration
    );
  });

  next();
});

// Health endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
  startWorkerLoop();   
});

