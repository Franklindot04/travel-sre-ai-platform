import client from "prom-client";
import { createMetrics } from "../shared/metrics";
import { startWorkerLoop } from "./worker";
import express from "express";
import { handleRemediation } from "./remediation";   // ✅ REQUIRED IMPORT

// -----------------------------
// Metrics setup
// -----------------------------
const { register, httpRequestCounter, httpRequestDuration } = createMetrics(
  "ai-sre-agent",
  client
);

const app = express();
app.use(express.json());

// HTTP request metrics middleware
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

// -----------------------------
// Health endpoint
// -----------------------------
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// -----------------------------
// Remediation endpoint (Alertmanager webhook)
// -----------------------------
app.post("/remediate", async (req, res) => {
  try {
    const alerts = req.body?.alerts || [];

    for (const alert of alerts) {
      await handleRemediation(alert);
    }

    res.status(200).send("ok");
  } catch (err) {
    console.error("Remediation handler error:", err);
    res.status(500).send("error");
  }
});

// -----------------------------
// Metrics endpoint
// -----------------------------
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// -----------------------------
// Start service
// -----------------------------
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`AI SRE Agent running on port ${PORT}`);
  startWorkerLoop();
});
