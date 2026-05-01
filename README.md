# 🚀 AI SRE Agent Platform  
### Kubernetes‑native, fully observable, self‑healing microservice platform

![Kubernetes](https://img.shields.io/badge/Kubernetes-Platform-blue?logo=kubernetes)
![Prometheus](https://img.shields.io/badge/Monitoring-Prometheus-orange?logo=prometheus)
![Grafana](https://img.shields.io/badge/Dashboards-Grafana-yellow?logo=grafana)
![Slack](https://img.shields.io/badge/Alerts-Slack-purple?logo=slack)
![TypeScript](https://img.shields.io/badge/Code-TypeScript-blue?logo=typescript)
![Status](https://img.shields.io/badge/Status-Production--Ready-brightgreen)

---

# 📘 Overview

The **AI SRE Agent Platform** is a cloud‑native, SRE‑focused demo environment that simulates a real production ecosystem:

- Multiple microservices  
- API gateway  
- Full observability stack  
- SLOs + burn‑rate alerts  
- Slack alerting  
- Auto‑remediation  
- GitOps‑friendly dashboards  
- Kubernetes‑native deployments  

It is designed to demonstrate **how modern SRE teams build, monitor, and operate distributed systems**.

---

# 🧠 High‑Level Architecture

```mermaid
flowchart TD
A[Client / User] --> B[API Gateway]

B --> S1[Search Service]
B --> B1[Booking Service]
B --> I1[Inventory Service]
B --> P1[Payment Service]

subgraph SRE[AI SRE Agent]
W1[Worker Loop]
W2[Agent Endpoints]
end

subgraph OBS[Observability Stack]
P[Prometheus]
AM[Alertmanager]
G[Grafana]
L[Loki]
PT[Promtail]
end

S1 -->|ServiceMonitor| P
B1 -->|ServiceMonitor| P
I1 -->|ServiceMonitor| P
P1 -->|ServiceMonitor| P
W2 -->|ServiceMonitor| P

S1 --> PT --> L
B1 --> PT --> L
I1 --> PT --> L
P1 --> PT --> L
W1 --> PT --> L

P -->|SLO Burn‑Rate Alerts| AM
AM -->|Slack Alerts| SL[Slack]
AM -->|Webhook| W2

W2 -->|Restart / Scale| K8S[(Kubernetes API)]
```

---

# 🔥 Key Features

## ✅ 1. Multi‑Service Kubernetes Platform  
Includes:

- API Gateway  
- Booking Service  
- Inventory Service  
- Payment Service  
- Search Service  
- AI SRE Agent  

Each service includes:

- Deployment  
- Service  
- ServiceMonitor  
- Dockerfile  
- TypeScript code  

---

## ✅ 2. Full Observability Stack

### **Prometheus**
- Scrapes all services  
- Evaluates SLO recording rules  
- Computes burn‑rates  

### **Alertmanager**
- Routes alerts to:
  - Slack  
  - AI SRE Agent `/remediate` webhook  

### **Grafana**
Dashboards included:

- Platform Overview  
- AI SRE Agent Dashboard  
- AI SRE Agent SLO Dashboard  
- Per‑service dashboards  

### **Loki + Promtail**
- Centralized logs  
- Queryable in Grafana  

---

# 🎯 SLOs & Error Budgets

The AI SRE Agent has two SLOs:

### **Availability SLO**
- 99% success rate  
- Based on `jobs_processed_total`  

### **Latency SLO**
- 95% of jobs under **1.5s**  
- Based on `job_duration_seconds_bucket`  

### **Burn‑Rate Alerts**
Multi‑window burn‑rates:

| Window | Threshold | Purpose |
|--------|-----------|---------|
| 5m     | > 14×     | Fast burn (restart) |
| 30m    | > 3×      | Slow burn (scale to 2) |
| 30m    | > 3× for 30m | Persistent burn (scale to 3) |
| 2h     | > 1×      | Human escalation |

---

# 🤖 Auto‑Remediation Engine

The AI SRE Agent exposes:

```
/health
/metrics
/remediate
```

Alertmanager POSTs alerts to `/remediate`.

### Remediation actions:

| Burn Type | Action |
|-----------|--------|
| Fast burn | Restart deployment |
| Slow burn | Scale to 2 replicas |
| Persistent burn | Scale to 3 replicas |
| Long burn | Human escalation |

### Slack notifications example:

```
⚠️ Sustained burn — scaling ai-sre-agent to 2 replicas
🔥 Persistent burn — scaling ai-sre-agent to 3 replicas
🚨 Long burn — human intervention required
```

---

## 📂 Repository Structure

```text
.
├── README.md
├── docs
│   ├── apis.md
│   ├── architecture-diagram.md
│   ├── architecture.md
│   ├── auto-remediation.md
│   ├── platform-overview.md
│   └── slo.md
├── infra
│   ├── helm
│   ├── k8s
│   │   ├── namespaces
│   │   │   └── platform.yaml
│   │   └── platform
│   │       ├── ai-sre-agent
│   │       │   ├── deployment.yaml
│   │       │   ├── service.yaml
│   │       │   └── servicemonitor.yaml
│   │       ├── api-gateway
│   │       │   ├── deployment.yaml
│   │       │   ├── service.yaml
│   │       │   └── servicemonitor.yaml
│   │       ├── booking-service
│   │       │   ├── deployment.yaml
│   │       │   ├── service.yaml
│   │       │   └── servicemonitor.yaml
│   │       ├── inventory-service
│   │       │   ├── deployment.yaml
│   │       │   ├── service.yaml
│   │       │   └── servicemonitor.yaml
│   │       ├── payment-service
│   │       │   ├── deployment.yaml
│   │       │   ├── service.yaml
│   │       │   └── servicemonitor.yaml
│   │       └── search-service
│   │           ├── deployment.yaml
│   │           ├── service.yaml
│   │           └── servicemonitor.yaml
│   └── observability
│       ├── alertmanager
│       │   └── ai-sre-agent-alerts.yaml
│       ├── grafana-dashboards
│       │   ├── json
│       │   │   ├── ai-sre-agent-slo-dashboard.json
│       │   │   ├── api-gateway.json
│       │   │   ├── platform-overview.json
│       │   │   └── service-template.json
│       │   └── yaml
│       │       ├── ai-sre-agent-dashboard.yaml
│       │       ├── ai-sre-agent-slo-dashboard-configmap.yaml
│       │       ├── platform-overview-configmap.yaml
│       │       └── service-template-configmap.yaml
│       ├── loki-values.yaml
│       ├── prometheus-rules
│       │   ├── ai-sre-agent-rules.yaml
│       │   ├── ai-sre-agent-slo-alerts.yaml
│       │   └── ai-sre-agent-slo-rules.yaml
│       ├── prometheus-values.yaml
│       └── promtail-values.yaml
├── scripts
├── services
│   ├── _template
│   │   ├── package.json
│   │   ├── src
│   │   │   └── index.ts
│   │   ├── tests
│   │   └── tsconfig.json
│   ├── ai-sre-agent
│   │   ├── Dockerfile
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── index.ts
│   │   │   ├── remediation.ts
│   │   │   ├── slack.ts
│   │   │   ├── worker-metrics.ts
│   │   │   └── worker.ts
│   │   ├── tests
│   │   └── tsconfig.json
│   ├── api-gateway
│   │   ├── Dockerfile
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── src
│   │   │   └── index.ts
│   │   ├── tests
│   │   └── tsconfig.json
│   ├── booking-service
│   │   ├── Dockerfile
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── src
│   │   │   └── index.ts
│   │   ├── tests
│   │   └── tsconfig.json
│   ├── inventory-service
│   │   ├── Dockerfile
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── src
│   │   │   └── index.ts
│   │   ├── tests
│   │   └── tsconfig.json
│   ├── payment-service
│   │   ├── Dockerfile
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── src
│   │   │   └── index.ts
│   │   ├── tests
│   │   └── tsconfig.json
│   └── search-service
│       ├── Dockerfile
│       ├── package-lock.json
│       ├── package.json
│       ├── src
│       │   └── index.ts
│       ├── tests
│       └── tsconfig.json
└── shared
    ├── config.ts
    ├── http.ts
    ├── logger.ts
    ├── metrics.ts
    └── types.d.ts
```

---

# 🧪 What’s Fully Implemented

- ✔ AI SRE Agent worker  
- ✔ Metrics instrumentation  
- ✔ Prometheus scraping  
- ✔ SLO recording rules  
- ✔ Burn‑rate alerts  
- ✔ Alertmanager routing  
- ✔ Slack notifications  
- ✔ Auto‑remediation (restart + scale)  
- ✔ Grafana dashboards  
- ✔ Loki + Promtail logging  
- ✔ GitOps‑friendly dashboards  

---

# 🔮 Roadmap

### Short‑Term
- Rate‑limited remediation  
- Cooldown windows  
- Canary remediation  
- Synthetic monitoring  

### Medium‑Term
- CI/CD pipeline  
- GitOps with ArgoCD  
- Load testing + chaos engineering  

### Long‑Term
- Multi‑cluster federation  
- Predictive scaling  

---

# 🚀 Deployment

### 1. Apply namespaces
```bash
kubectl apply -f infra/k8s/namespaces
```

### 2. Deploy platform services
```bash
kubectl apply -f infra/k8s/platform
```

### 3. Deploy observability stack
```bash
kubectl apply -f infra/observability
```

### 4. Deploy AI SRE Agent
```bash
kubectl apply -f infra/k8s/platform/ai-sre-agent
```

---

# 👤 Author

**Franklin Ajero**  
Senior SRE / DevOps Engineer  
Kubernetes • Observability • Reliability Engineering  

---

# ⭐ Why This Project Matters

This platform demonstrates **real‑world SRE engineering**:

- Metrics  
- SLOs  
- Burn‑rates  
- Alerting  
- Dashboards  
- Auto‑remediation  
- Kubernetes  
- Observability  

It is a **portfolio‑grade**, **interview‑ready**, **production‑style** SRE platform.

