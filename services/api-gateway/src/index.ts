import client from "prom-client";
import { createMetrics } from "../shared/metrics";

const { register, httpRequestCounter, httpRequestDuration } = createMetrics(
  "api-gateway",
  client
);

import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;

    httpRequestCounter.inc({
      service: "api-gateway",
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });

    httpRequestDuration.observe(
      {
        service: "api-gateway",
        method: req.method,
        route: req.path,
      },
      duration
    );
  });

  next();
});


app.get("/health", (_req, res) => res.json({ status: "ok" }));

// Proxy search
app.get("/search", async (req, res) => {
  const { type } = req.query;

  const base = "http://localhost:3001/search";

  const url =
    type === "hotel"
      ? `${base}/hotels`
      : `${base}/flights`;

  const response = await axios.get(url, { params: req.query });
  res.json(response.data);
});

// Proxy booking
app.post("/book", async (req, res) => {
  const response = await axios.post(
    "http://localhost:3004/bookings",
    req.body
  );
  res.json(response.data);
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`api-gateway running on ${PORT}`));
