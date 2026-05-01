import client from "prom-client";

export const register = client.register; // <-- export this

export function createMetrics(serviceName: string, clientLib = client) {
  const httpRequestCounter = new clientLib.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["service", "method", "route", "status"],
  });

  const httpRequestDuration = new clientLib.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["service", "method", "route"],
    buckets: [0.1, 0.5, 1, 2, 5],
  });

  return {
    register,              // <-- return the same register
    httpRequestCounter,
    httpRequestDuration,
  };
}
