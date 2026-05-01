// services/ai-sre-agent/src/remediation.ts

import { exec } from "child_process";
import { sendSlackMessage } from "./slack";
import util from "util";

const execAsync = util.promisify(exec);

const NAMESPACE = "platform";
const DEPLOYMENT = "ai-sre-agent";

export async function handleRemediation(alert: any) {
  try {
    const alertname = alert?.labels?.alertname;
    const severity = alert?.labels?.severity;
    const remediation = alert?.labels?.remediation;

    if (!remediation) {
      console.log("No remediation label found, ignoring alert");
      return;
    }

    console.log(`Received remediation request: ${remediation} (${alertname})`);

    switch (remediation) {
      case "restart":
        await restartDeployment();
        await sendSlackMessage(
          `⚠️ *Fast burn detected* — restarting *${DEPLOYMENT}*`
        );
        break;

      case "scale_to_2":
        await scaleDeployment(2);
        await sendSlackMessage(
          `⚠️ *Sustained burn* — scaling *${DEPLOYMENT}* to *2 replicas*`
        );
        break;

      case "scale_to_3":
        await scaleDeployment(3);
        await sendSlackMessage(
          `🔥 *Persistent burn* — scaling *${DEPLOYMENT}* to *3 replicas*`
        );
        break;

      case "escalate":
        await sendSlackMessage(
          `🚨 *Long burn detected* — auto-remediation exhausted. Human intervention required.`
        );
        break;

      default:
        console.log(`Unknown remediation action: ${remediation}`);
    }
  } catch (err) {
    console.error("Remediation error:", err);
    await sendSlackMessage(
      `❌ Auto-remediation failed: ${err instanceof Error ? err.message : err}`
    );
  }
}

async function restartDeployment() {
  console.log("Restarting deployment...");
  await execAsync(
    `kubectl rollout restart deployment/${DEPLOYMENT} -n ${NAMESPACE}`
  );
}

async function scaleDeployment(replicas: number) {
  console.log(`Scaling deployment to ${replicas} replicas...`);
  await execAsync(
    `kubectl scale deployment/${DEPLOYMENT} --replicas=${replicas} -n ${NAMESPACE}`
  );
}
