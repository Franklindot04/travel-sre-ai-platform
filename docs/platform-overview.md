# Platform Overview

The **travel-sre-ai-platform** is a cloud-native, SRE-focused demo platform
designed to showcase production-grade practices for observability, SLOs,
auto-remediation, and AI-assisted operations.

It simulates a travel booking system composed of multiple microservices, an
API gateway, and an AI SRE Agent that monitors and heals the platform.

---

## 1. High-Level Goals

The platform is built to demonstrate:

- **Modern SRE practices**: SLOs, burn-rate alerts, error budgets
- **Deep observability**: metrics, logs, dashboards
- **Auto-remediation**: self-healing behavior driven by alerts
- **AI-assisted operations**: an AI SRE Agent that reacts to incidents
- **Kubernetes-native design**: services, namespaces, ServiceMonitor, etc.

It is intentionally small but architected like a real production system.

---

## 2. Core Services

All services run in the `platform` namespace.

- **API Gateway**
  - Entry point for client traffic
  - Routes requests to backend services
  - Exposes HTTP metrics

- **Booking Service**
  - Manages bookings and reservations
  - Represents core business logic

- **Inventory Service**
  - Manages available seats/rooms/inventory
  - Used by booking flows

- **Payment Service**
  - Simulates payment processing
  - Can be used to trigger failure scenarios

- **Search Service**
  - Handles search queries for travel options

- **AI SRE Agent**
  - Background worker that scans metrics/logs
  - Exposes `/health`, `/metrics`, `/remediate`
  - Executes auto-remediation actions based on alerts

Each service has:

- A Dockerfile
- A Kubernetes `Deployment`
- A `Service`
- A `ServiceMonitor` for Prometheus scraping

---

## 3. Observability Stack

The platform uses a standard Kubernetes observability stack:

- **Prometheus**
  - Scrapes metrics from all services
  - Evaluates SLO recording rules
  - Triggers SLO and burn-rate alerts

- **Alertmanager**
  - Routes alerts to:
    - Slack (`#travel-sre-ai-platform-alerts`)
    - AI SRE Agent webhook (`/remediate`)
  - Uses `AlertmanagerConfig` for routing and receivers

- **Grafana**
  - Dashboards for:
    - Platform overview
    - Per-service metrics
    - AI SRE Agent SLOs and burn-rates

- **Loki + Promtail**
  - Centralized logging
  - Log aggregation for all services

---

## 4. SLOs and Error Budgets

The AI SRE Agent has explicit SLOs:

- **Availability SLO**
  - 99% success rate for anomaly scan jobs
  - Based on `jobs_processed_total` metrics

- **Latency SLO**
  - 95% of anomaly scan jobs under 1.5s
  - Based on `job_duration_seconds_bucket` histogram

Prometheus recording rules compute:

- Success ratio
- Latency percentiles
- Error budget remaining
- Burn-rates (5m, 30m)

These are visualized in a dedicated **SLO dashboard**.

---

## 5. Auto-Remediation

Auto-remediation is driven by SLO burn-rate alerts:

- **Fast burn (5m > 14×)** → restart AI SRE Agent
- **Slow burn (30m > 3×)** → scale to 2 replicas
- **Persistent burn (30m > 3× for 30m)** → scale to 3 replicas
- **Long burn (2h > 1×)** → human escalation

Alertmanager sends these alerts to:

- Slack (for humans)
- AI SRE Agent `/remediate` (for automation)

The AI SRE Agent then:

- Executes `kubectl` commands to restart/scale
- Sends Slack notifications for each action

See `docs/auto-remediation.md` for details.

---

## 6. Kubernetes Layout

Key Kubernetes resources:

- Namespace:
  - `infra/k8s/namespaces/platform.yaml`

- Services (per component):
  - `infra/k8s/platform/<service>/deployment.yaml`
  - `infra/k8s/platform/<service>/service.yaml`
  - `infra/k8s/platform/<service>/servicemonitor.yaml`

- Observability:
  - `infra/observability/prometheus-values.yaml`
  - `infra/observability/prometheus-rules/*.yaml`
  - `infra/observability/alertmanager/ai-sre-agent-alerts.yaml`
  - `infra/observability/grafana-dashboards/*`

---

## 7. Intended Use

This platform is designed for:

- SRE interviews and portfolio demonstrations
- Hands-on practice with SLOs and burn-rates
- Experimenting with auto-remediation patterns
- Teaching modern observability and incident response

It is not meant to be feature-complete as a travel product, but rather
**realistic as an SRE playground**.
