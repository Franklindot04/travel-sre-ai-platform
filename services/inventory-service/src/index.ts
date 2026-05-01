import client from "prom-client";
import { createMetrics } from "../shared/metrics";

const { register, httpRequestCounter, httpRequestDuration } = createMetrics(
  "inventory-service",
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
      service: "inventory-service",
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });

    httpRequestDuration.observe(
      {
        service: "inventory-service",
        method: req.method,
        route: req.path,
      },
      duration
    );
  });

  next();
});

// In-memory availability
const inventory: Record<string, number> = {
  "FL123": 5,
  "FL456": 3,
  "HTL001": 10,
  "HTL002": 7,
};

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.post("/inventory/reserve", (req, res) => {
  const { itineraryId, count } = req.body;

  if (!inventory[itineraryId] || inventory[itineraryId] < count) {
    return res.status(400).json({ error: "Not enough availability" });
  }

  inventory[itineraryId] -= count;
  res.json({ success: true, remaining: inventory[itineraryId] });
});

app.post("/inventory/release", (req, res) => {
  const { itineraryId, count } = req.body;

  inventory[itineraryId] = (inventory[itineraryId] || 0) + count;
  res.json({ success: true, remaining: inventory[itineraryId] });
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`inventory-service running on ${PORT}`));
