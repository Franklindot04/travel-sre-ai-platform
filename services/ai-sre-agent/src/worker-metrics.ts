import client from "prom-client";
import { register } from "../shared/metrics";

export const jobsProcessedTotal = new client.Counter({
  name: "ai_sre_jobs_processed_total",
  help: "Total number of jobs processed by AI SRE Agent",
  labelNames: ["job_type", "result"],
  registers: [register],   // <-- same registry as /metrics
});

export const jobDurationSeconds = new client.Histogram({
  name: "ai_sre_job_duration_seconds",
  help: "Duration of AI SRE Agent jobs",
  labelNames: ["job_type", "result"],
  buckets: [0.1, 0.5, 1, 2, 5, 10],
  registers: [register],   // <-- same registry
});
