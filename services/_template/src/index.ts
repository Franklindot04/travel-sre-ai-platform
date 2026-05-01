import express from "express";

const app = express();
app.use(express.json());

// Health endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Placeholder for metrics (Prometheus later)
app.get("/metrics", (_req, res) => {
  res.type("text/plain").send("# metrics will be added later\n");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});
