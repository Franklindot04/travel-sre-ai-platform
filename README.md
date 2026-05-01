# 🚀 AI SRE Agent Platform

Kubernetes‑native, fully observable, self‑monitoring microservice platform with Prometheus, Alertmanager, Grafana and Slack alerting.

This project implements a production‑grade SRE (Site Reliability Engineering) platform designed to simulate real‑world reliability workflows:

- Instrumented microservices  
- Prometheus metrics  
- Custom alert rules  
- Alertmanager routing  
- Slack notifications  
- Grafana dashboards  
- Kubernetes deployments  
- GitOps‑friendly infra layout  

It demonstrates how a modern SRE team builds, monitors and operates distributed systems.

---

## 📌 Project Status

**MVP Completed — Core SRE pipeline fully operational**

What works today:

- AI SRE Agent worker service  
- Metrics instrumentation  
- Prometheus scraping  
- PrometheusRule firing  
- AlertmanagerConfig routing  
- Slack integration  
- Kubernetes deployments  
- Grafana dashboards  
- End‑to‑end alert delivery  

What’s next:

- SLO dashboards  
- Error budget burn alerts  
- Auto‑remediation hooks  
- Log aggregation with Loki  
- CI/CD pipeline  
- GitOps deployment  

---

## 🧠 Architecture Overview

```text
┌───────────────────────────────┐
│ AI SRE Agent Worker           │
│ (TypeScript microservice)     │
└───────────────────────────────┘
           │ emits metrics
           ▼
┌───────────────────────────────┐
│ Prometheus                    │
│ (scrapes /metrics)            │
└───────────────────────────────┘
           │ triggers alerts
           ▼
┌───────────────────────────────┐
│ Alertmanager                  │
│ (routes alerts)               │
└───────────────────────────────┘
           │ Slack webhook
           ▼
┌───────────────────────────────┐
│ Slack Notifications           │
│ #travel-sre-ai-platform       │
└───────────────────────────────┘

Grafana dashboards visualize:
- worker success/failure rate
- job duration
- platform overview
```

---

## 🛠️ Core Features

### 1. AI SRE Agent Worker

A TypeScript microservice that simulates job processing:

- Random success/failure  
- Metrics for job count & duration  
- Slack notifications on failure  
- Configurable job type  
- 30‑second loop  

Metrics exposed:

- `jobs_processed_total{job_type, result}`  
- `job_duration_seconds{job_type, result}`  

---

### 2. Prometheus Integration

Prometheus scrapes the worker via a `ServiceMonitor`.

Custom alert rules included:

- High failure rate  
- Consecutive failures  
- Job duration anomalies  

---

### 3. Alertmanager + Slack Routing

AlertmanagerConfig defines:

- Slack receiver  
- AISREAgent route  
- Matchers for job types  
- Templates for formatting  

Example Slack alert:

```text
❗ AI SRE Agent Failure
Job Type: anomaly_scan
Duration: 1.52s
```

---

### 4. Grafana Dashboards

Dashboards included:

- AI SRE Agent dashboard  
- Platform overview  
- Service template dashboard  
- API gateway dashboard  

All dashboards are stored as ConfigMaps (GitOps‑friendly).

---

### 5. Kubernetes Manifests

Each service includes:

- Deployment  
- Service  
- ServiceMonitor  

Infra includes:

- Namespaces  
- Observability stack configs  
- Alert rules  
- Dashboards  

---

## 📂 Repository Structure

```text
.
├── .gitignore
├── README.md
├── docs
│   ├── apis.md
│   └── architecture.md
├── infra
│   ├── helm                      # Reserved for future Helm charts
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
│       │   ├── ai-sre-agent-dashboard.yaml
│       │   ├── api-gateway.json
│       │   ├── platform-overview-configmap.yaml
│       │   ├── platform-overview.json
│       │   ├── service-template-configmap.yaml
│       │   └── service-template.json
│       ├── loki-values.yaml
│       ├── prometheus-rules
│       │   └── ai-sre-agent-rules.yaml
│       ├── prometheus-values.yaml
│       └── promtail-values.yaml
├── scripts                        # Reserved for future automation/CI scripts
├── services
│   ├── _template
│   │   ├── package.json
│   │   ├── src
│   │   │   └── index.ts
│   │   ├── tests                  # Placeholder for future tests
│   │   └── tsconfig.json
│   ├── ai-sre-agent
│   │   ├── Dockerfile
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── index.ts
│   │   │   ├── slack.ts
│   │   │   ├── worker-metrics.ts
│   │   │   └── worker.ts
│   │   ├── tests                  # Placeholder for future tests
│   │   └── tsconfig.json
│   ├── api-gateway
│   │   ├── Dockerfile
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── src
│   │   │   └── index.ts
│   │   ├── tests                  # Placeholder for future tests
│   │   └── tsconfig.json
│   ├── booking-service
│   │   ├── Dockerfile
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── src
│   │   │   └── index.ts
│   │   ├── tests                  # Placeholder for future tests
│   │   └── tsconfig.json
│   ├── inventory-service
│   │   ├── Dockerfile
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── src
│   │   │   └── index.ts
│   │   ├── tests                  # Placeholder for future tests
│   │   └── tsconfig.json
│   ├── payment-service
│   │   ├── Dockerfile
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── src
│   │   │   └── index.ts
│   │   ├── tests                  # Placeholder for future tests
│   │   └── tsconfig.json
│   └── search-service
│       ├── Dockerfile
│       ├── package-lock.json
│       ├── package.json
│       ├── src
│       │   └── index.ts
│       ├── tests                  # Placeholder for future tests
│       └── tsconfig.json
└── shared
    ├── config.ts
    ├── http.ts
    ├── logger.ts
    ├── metrics.ts
    └── types.d.ts
```

Empty directories like `helm`, `scripts`, and `tests` are intentionally kept as placeholders for future Helm charts, automation scripts and test suites.

---

## 🧪 What Has Been Achieved So Far

- Fully working SRE alerting pipeline  
- Worker emits metrics correctly  
- Prometheus scrapes metrics  
- PrometheusRule fires alerts  
- Alertmanager merges AlertmanagerConfig  
- Slack receives alerts  
- Kubernetes manifests are clean and reproducible  
- Repo is clean, professional, and GitHub‑ready  

---

## 🔮 Planned Improvements (Roadmap)

### Short‑Term

- Add SLO dashboards (availability, latency, error budget)  
- Add burn‑rate alerts (multi‑window, multi‑burn)  
- Add log aggregation with Loki + Promtail  
- Add rate‑limiting to Slack alerts  
- Add alert grouping to reduce noise  

### Medium‑Term

- Auto‑remediation:  
  - Restart worker on failure spikes  
  - Clear queue  
  - Notify Slack  
  - Escalate if unresolved  

### Long‑Term

- GitOps with ArgoCD or Flux  
- CI/CD pipeline (GitHub Actions)  
- Canary deployments  
- Load testing + chaos engineering  
- Multi‑cluster federation  

---

## 🏁 How to Deploy

### 1. Apply namespaces

```bash
kubectl apply -f infra/k8s/namespaces
```

### 2. Deploy platform services

```bash
kubectl apply -f infra/k8s/platform
```

### 3. Deploy observability components

```bash
kubectl apply -f infra/observability
```

### 4. Deploy AI SRE Agent

```bash
kubectl apply -f infra/k8s/platform/ai-sre-agent
```

---

## 📣 Example Slack Alert

```text
❗ AI SRE Agent Failure
Job Type: anomaly_scan
Duration: 1.63s
```

---

## 🧑‍💻 Author

**Franklin Ajero**  
Senior SRE / DevOps Engineer  

---

## ⭐ Why This Project Matters

This project demonstrates real‑world SRE engineering:

- Metrics  
- Alerting  
- Dashboards  
- Kubernetes  
- Observability  
- Automation  

It’s a portfolio‑grade example of how to design, instrument, and operate a modern, observable platform.

