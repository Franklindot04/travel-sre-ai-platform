# Architecture Overview — travel-sre-ai-platform

## 1. High-Level System Architecture

The platform is a microservices-based travel booking system deployed on Kubernetes.  
All services communicate through internal ClusterIP services, with the API Gateway acting as the public entry point.

```
Client (Browser / Mobile / API Consumer)
        |
        v
  [api-gateway]  <-- Only externally exposed service
     |     \
     |      \------------------------------\
     |                                       \
     v                                        v
[search-service]                        [booking-service]
                                             |        \
                                             |         \
                                             v          v
                                   [inventory-service] [payment-service]
```

### Responsibilities

- **api-gateway**  
  Routes all client traffic to internal services. Handles search, booking, and orchestration.

- **search-service**  
  Provides flight and hotel search endpoints.

- **booking-service**  
  Orchestrates booking flows, calling inventory and payment services.

- **inventory-service**  
  Manages seat/room availability and reservations.

- **payment-service**  
  Simulates payment authorization and processing.

---

## 2. SRE / AI Components

The platform includes a full observability and reliability stack:

```
[Kubernetes Cluster]
   ├── Microservices (6 total)
   ├── Observability Stack
   │     ├── Prometheus (metrics)
   │     ├── Grafana (dashboards)
   │     ├── Loki (logs)
   │     └── Promtail (log shipping)
   └── AI SRE Agent
         ├── Processes anomaly detection jobs
         ├── Exposes metrics for SLOs
         ├── Provides incident analysis via HTTP API
         └── Integrates with Slack (alerts)
```

### Observability Features

- **ServiceMonitor** for each microservice  
- **PrometheusRule** for:
  - service alerts  
  - SLO burn-rate alerts  
  - latency and availability recording rules  

- **Grafana dashboards** (stored in ConfigMaps):
  - Platform Overview  
  - AI SRE Agent Dashboard  
  - AI SRE Agent SLO Dashboard  
  - Service Template Dashboard  

- **Loki + Promtail** for log aggregation

---

## 3. Deployment Model

All services run inside:

```
namespace: platform
```

Observability stack runs inside:

```
namespace: observability
```

### Service Exposure

| Service            | Type       | Port  | Exposed? |
|-------------------|------------|-------|----------|
| api-gateway       | NodePort   | 3000  | Yes      |
| search-service    | ClusterIP  | 3001  | No       |
| inventory-service | ClusterIP  | 3002  | No       |
| payment-service   | ClusterIP  | 3003  | No       |
| booking-service   | ClusterIP  | 3004  | No       |
| ai-sre-agent      | ClusterIP  | 3005  | No       |

---

## 4. AI SRE Agent Architecture

The AI SRE Agent is a worker service that:

- processes anomaly detection jobs  
- exposes Prometheus metrics  
- simulates job failures for SLO testing  
- provides an `/analyze/incident` API  
- integrates with Slack for alerting  
- participates in SLO burn-rate alerting  

Metrics include:

- `jobs_processed_total`  
- `job_duration_seconds_bucket`  
- `job_duration_seconds_sum`  
- `job_duration_seconds_count`  

These power:

- availability SLO  
- latency SLO  
- error budgets  
- burn-rate alerts  
- Grafana dashboards  

---

## 5. Future Enhancements

- Synthetic monitoring (Blackbox exporter)  
- Auto-remediation workflows  
- Distributed tracing (Tempo)  
- Chaos engineering  
- Multi-region deployment  

