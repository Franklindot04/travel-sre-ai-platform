# AI SRE Agent — Auto‑Remediation System

The AI SRE Agent includes a fully automated remediation engine that reacts to
SLO burn‑rate alerts and performs controlled self‑healing actions inside the
Kubernetes cluster. This system reduces MTTR, protects error budgets, and
ensures platform stability without requiring constant human intervention.

---

## 1. Overview

Auto‑remediation is triggered by Prometheus SLO burn‑rate alerts.  
Alertmanager forwards these alerts to the AI SRE Agent via a webhook:

```
POST /remediate
```

The agent evaluates the alert severity and the `remediation` label to decide
which action to perform:

- Restart the deployment  
- Scale to 2 replicas  
- Scale to 3 replicas  
- Escalate to humans via Slack  

This mirrors the remediation patterns used by large SRE organizations such as
Google, Uber, and Expedia.

---

## 2. Burn‑Rate Model

The system uses multi‑window burn‑rate alerts:

| Window | Purpose | Threshold |
|--------|---------|-----------|
| 5m     | Fast burn (critical) | > 14× budget |
| 30m    | Slow burn (warning)  | > 3× budget |
| 30m (persistent) | Long sustained burn | > 3× for 30m |
| 2h     | Human escalation | > 1× budget |

Both **availability** and **latency** SLOs use the same structure.

---

## 3. Alert Flow

1. Prometheus evaluates SLO burn‑rate rules.
2. Alerts fire with labels:
   - `severity`
   - `alertname`
   - `remediation` (restart, scale_to_2, scale_to_3, escalate)
3. Alertmanager routes alerts to:
   - Slack (human visibility)
   - AI SRE Agent webhook (automation)
4. AI SRE Agent performs the remediation action.
5. Slack receives a confirmation message.

---

## 4. Remediation Actions

### **4.1 Fast Burn (5m > 14×) — Restart**

Triggered when the SLO is burning extremely fast.

Action:

```
kubectl rollout restart deployment/ai-sre-agent -n platform
```

Slack message:

> ⚠️ Fast burn detected — restarting ai-sre-agent

---

### **4.2 Slow Burn (30m > 3×) — Scale to 2 Replicas**

Triggered when the SLO is burning steadily over time.

Action:

```
kubectl scale deployment/ai-sre-agent --replicas=2 -n platform
```

Slack message:

> ⚠️ Sustained burn — scaling ai-sre-agent to 2 replicas

---

### **4.3 Persistent Burn (30m > 3× for 30m) — Scale to 3 Replicas**

Triggered when the burn continues even after scaling to 2.

Action:

```
kubectl scale deployment/ai-sre-agent --replicas=3 -n platform
```

Slack message:

> 🔥 Persistent burn — scaling ai-sre-agent to 3 replicas

---

### **4.4 Long Burn (2h > 1×) — Human Escalation**

Triggered when all automated actions fail.

Action:

- No further scaling or restarts
- Slack escalation message

Slack message:

> 🚨 Long burn detected — auto-remediation exhausted. Human intervention required.

---

## 5. Webhook Payload Format

Alertmanager sends the following structure:

```json
{
  "alerts": [
    {
      "labels": {
        "alertname": "AISREAgentAvailabilityFastBurn",
        "severity": "critical",
        "remediation": "restart"
      },
      "annotations": {
        "summary": "...",
        "description": "..."
      }
    }
  ]
}
```

The AI SRE Agent processes each alert individually.

---

## 6. AI SRE Agent Remediation Engine

The remediation engine:

- Parses incoming alerts
- Determines the remediation action
- Executes Kubernetes commands via `kubectl`
- Sends Slack notifications
- Logs all actions for auditability

The engine is implemented in:

```
services/ai-sre-agent/src/remediation.ts
```

---

## 7. Disabling Auto‑Remediation

Auto‑remediation can be disabled by:

1. Removing the `remediation` label from alerts  
2. Removing the webhook receiver from Alertmanager  
3. Temporarily scaling the AI SRE Agent to 0 replicas  
4. Adding a feature flag inside the agent (optional future enhancement)

---

## 8. Future Enhancements

Potential improvements:

- Rate‑limited remediation (avoid flapping)
- Cooldown periods between actions
- Canary remediation (test before full rollout)
- Integration with incident management tools
- Predictive scaling using historical metrics

---

## 9. Summary

The AI SRE Agent now provides:

- Autonomous restart logic  
- Intelligent scaling decisions  
- Multi‑window burn‑rate analysis  
- Slack‑based visibility  
- Human escalation when automation is insufficient  

This transforms the platform into a **self‑healing SRE‑grade system** that
protects error budgets and reduces operational load.
