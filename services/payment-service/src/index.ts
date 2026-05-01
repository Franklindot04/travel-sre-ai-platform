import client from "prom-client";
import { createMetrics } from "../shared/metrics";

const { register, httpRequestCounter, httpRequestDuration } = createMetrics(
  "payment-service",
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
      service: "payment-service",
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });

    httpRequestDuration.observe(
      {
        service: "payment-service",
        method: req.method,
        route: req.path,
      },
      duration
    );
  });

  next();
});

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.post("/payments", (req, res) => {
  const { amount, currency, method } = req.body;

  // Simulate random failure
  if (Math.random() < 0.2) {
    return res.status(500).json({ error: "Payment gateway error" });
  }

  res.json({
    success: true,
    transactionId: "TX-" + Math.floor(Math.random() * 100000),
    amount,
    currency,
    method,
  });
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`payment-service running on ${PORT}`));
