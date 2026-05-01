import { jobsProcessedTotal, jobDurationSeconds } from "./worker-metrics";
import { notifySlack } from "./slack";

const JOB_TYPE = "anomaly_scan";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processJob() {
  const start = Date.now();

  // 1. Simulate some work
  await sleep(500 + Math.random() * 1500);

  // 2. FORCE FAILURE (for testing alerts)
  const isFailure = Math.random() < 0.2;
  // If you want random behavior, replace with:
  // const isFailure = Math.random() < 0.2;
  // if you want forced fairlre later, replace with:
  // const isFailure = true;

  const durationSeconds = (Date.now() - start) / 1000;

  if (isFailure) {
    console.log("[worker] job FAILED", JOB_TYPE, "duration", durationSeconds);

    jobDurationSeconds.observe(
      { job_type: JOB_TYPE, result: "failure" },
      durationSeconds
    );

    jobsProcessedTotal.inc({
      job_type: JOB_TYPE,
      result: "failure",
    });

    await notifySlack(
      `❗ *AI SRE Agent Failure*\nJob Type: ${JOB_TYPE}\nDuration: ${durationSeconds.toFixed(
        2
      )}s`
    );

    return;
  }

  // SUCCESS path
  console.log("[worker] job SUCCESS", JOB_TYPE, "duration", durationSeconds);

  jobDurationSeconds.observe(
    { job_type: JOB_TYPE, result: "success" },
    durationSeconds
  );

  jobsProcessedTotal.inc({
    job_type: JOB_TYPE,
    result: "success",
  });
}

export function startWorkerLoop() {
  console.log("[worker] starting loop");

  (async () => {
    // Delay before first job
    await sleep(5000);

    while (true) {
      await processJob();
      await sleep(30000); // 30s between jobs
    }
  })();
}
