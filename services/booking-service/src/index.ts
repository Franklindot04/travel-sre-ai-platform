import client from "prom-client";
import { createMetrics } from "../shared/metrics";

const { register, httpRequestCounter, httpRequestDuration } = createMetrics(
  "booking-service",
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
      service: "booking-service",
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });

    httpRequestDuration.observe(
      {
        service: "booking-service",
        method: req.method,
        route: req.path,
      },
      duration
    );
  });

  next();
});

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.post("/bookings", async (req, res) => {
  const { itineraryId, userId, paymentDetails } = req.body;

  try {
    // Reserve inventory
    await axios.post("http://localhost:3002/inventory/reserve", {
      itineraryId,
      count: 1,
    });

    // Process payment
    const payment = await axios.post("http://localhost:3003/payments", {
      amount: 200,
      currency: "USD",
      method: paymentDetails.method,
    });

    // Booking success
    const bookingId = "BK-" + Math.floor(Math.random() * 100000);

    res.json({
      bookingId,
      userId,
      itineraryId,
      payment: payment.data,
    });
  } catch (err: any) {
    // Release inventory on failure
    await axios.post("http://localhost:3002/inventory/release", {
      itineraryId,
      count: 1,
    });

    return res.status(500).json({
      error: "Booking failed",
      details: err.message,
    });
  }
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`booking-service running on ${PORT}`));
