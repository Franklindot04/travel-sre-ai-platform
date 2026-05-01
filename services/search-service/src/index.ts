import client from "prom-client";
import { createMetrics } from "../shared/metrics";

const { register, httpRequestCounter, httpRequestDuration } = createMetrics(
  "search-service",
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
      service: "search-service",
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });

    httpRequestDuration.observe(
      {
        service: "search-service",
        method: req.method,
        route: req.path,
      },
      duration
    );
  });

  next();
});

// Health
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// Flight search
app.get("/search/flights", (req, res) => {
  const { origin, destination, date } = req.query;

  const results = [
    {
      flightId: "FL123",
      origin,
      destination,
      date,
      price: 250,
    },
    {
      flightId: "FL456",
      origin,
      destination,
      date,
      price: 310,
    },
  ];

  res.json({ results });
});

// Hotel search
app.get("/search/hotels", (req, res) => {
  const { city, checkIn, checkOut } = req.query;

  const results = [
    {
      hotelId: "HTL001",
      city,
      checkIn,
      checkOut,
      pricePerNight: 120,
    },
    {
      hotelId: "HTL002",
      city,
      checkIn,
      checkOut,
      pricePerNight: 180,
    },
  ];

  res.json({ results });
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`search-service running on ${PORT}`));
