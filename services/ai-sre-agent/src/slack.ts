const webhookUrl = process.env.SLACK_WEBHOOK_URL;

export async function notifySlack(message: string) {
  if (!webhookUrl) {
    console.error("[slack] No webhook URL configured");
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message }),
    });

    console.log("[slack] Notification sent");
  } catch (err) {
    console.error("[slack] Failed to send notification", err);
  }
}
