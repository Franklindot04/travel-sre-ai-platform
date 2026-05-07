# Platform Overview — travel-sre-ai-platform

The travel-sre-ai-platform is a cloud-native, SRE-focused demo platform designed to showcase production-grade practices for observability, SLOs, auto-remediation and AI-assisted operations. It simulates a travel booking system composed of multiple microservices, an API gateway, a UI portal, and an AI SRE Agent that monitors and heals the platform.

---

## 1. High-Level Goals

The platform demonstrates:

- Modern SRE practices: SLOs, burn-rate alerts, error budgets  
- Deep observability: metrics, logs, dashboards  
- Auto-remediation: self-healing behavior driven by alerts  
- AI-assisted operations: an AI SRE Agent that reacts to incidents  
- Kubernetes-native design: Deployments, Services, ServiceMonitor, PrometheusRule  
- GitOps workflows: ArgoCD ApplicationSet for multi-environment sync  

It is intentionally small but architected like a real production system.

---

## 2. Core Services

All services run in the platform namespace.

### API Gateway
- Public entry point  
- Routes search and booking requests  
- Exposes /metrics  
- Consumed by the UI Portal  

### Booking Service
- Manages bookings and reservations  
- Calls inventory-service and payment-service  

### Inventory Service
- Manages available seats/rooms  
- Reserve and release endpoints  

### Payment Service
- Simulates payment authorization  
- Useful for failure injection  

### Search Service
- Handles search queries for travel options  
- Provides flight and hotel search  

### AI SRE Agent
- Background worker that processes anomaly detection jobs  
- Exposes /health, /metrics, /analyze/incident, /remediate  
- Executes auto-remediation actions based on alerts  
- Sends Slack notifications  

### UI Portal
- Frontend SPA for platform visibility  
- Displays service health, SLOs, dashboards, and incident analysis  

Each service includes:

- Dockerfile  
- Kubernetes Deployment  
- Service  
- ServiceMonitor for Prometheus scraping  

---

## 3. Observability Stack

The platform uses a full Kubernetes observability stack:

### Prometheus
- Scrapes metrics from all services  
- Evaluates SLO recording rules  
- Triggers SLO and burn-rate alerts  

### Alertmanager
- Routes alerts to:
  - Slack (#travel-sre-ai-platform-alerts)
  - AI SRE Agent webhook (/remediate)  
- Uses AlertmanagerConfig for routing  

### Grafana
Dashboards include:

- Platform Overview  
- Per-service metrics  
- AI SRE Agent Dashboard  
- AI SRE Agent SLO Dashboard  
- Service Template Dashboard  

### Loki + Promtail
- Centralized logging  
- Log aggregation for all services  

---

## 4. SLOs and Error Budgets

The AI SRE Agent has explicit SLOs:

### Availability SLO
- 99% success rate for anomaly scan jobs  
- Based on jobs_processed_total  

### Latency SLO
- 95% of anomaly scan jobs under 1.5s  
- Based on job_duration_seconds_bucket histogram  

Prometheus recording rules compute:

- Success ratio  
- Latency percentiles  
- Error budget remaining  
- Burn-rates (5m, 30m)  

These power the AI SRE Agent SLO dashboard.

---

## 5. Auto-Remediation

Auto-remediation is driven by SLO burn-rate alerts:

- Fast burn (5m > 14×) → restart ai-sre-agent  
- Slow burn (30m > 3×) → scale to 2 replicas  
- Persistent burn (30m > 3× for 30m) → scale to 3 replicas  
- Long burn (2h > 1×) → human escalation  

Alertmanager sends alerts to:

- Slack (human visibility)  
- AI SRE Agent /remediate (automation)  

The AI SRE Agent then:

- Executes kubectl actions  
- Sends Slack notifications  
- Logs all actions  

See docs/auto-remediation.md for full details.

---

## 6. Kubernetes Layout

### Namespaces

- platform — all microservices + AI SRE Agent + UI Portal  
- observability — Prometheus, Alertmanager, Grafana, Loki, Promtail  

### Platform Services

infra/k8s/platform/<service>/
- deployment.yaml  
- service.yaml  
- servicemonitor.yaml  

### Observability

infra/observability/
- prometheus-values.yaml  
- prometheus-rules/*.yaml  
- alertmanager/ai-sre-agent-alerts.yaml  
- grafana-dashboards/*  
- loki-values.yaml  
- promtail-values.yaml  

---

## 7. GitOps Workflow (ArgoCD)

The entire platform is deployed using ArgoCD ApplicationSet:

infra/argocd/applicationset-platform.yaml

Features:

- Multi-environment sync (dev, develop, preprod, main)  
- Declarative, versioned infrastructure  
- Automatic reconciliation  
- Git-driven deployments  

---

## 8. Intended Use

This platform is designed for:

- SRE interviews and portfolio demonstrations  
- Hands-on practice with SLOs and burn-rates  
- Experimenting with auto-remediation patterns  
- Teaching modern observability and incident response  
- Demonstrating GitOps workflows  

It is not meant to be feature-complete as a travel product, but rather realistic as an SRE playground.

---
