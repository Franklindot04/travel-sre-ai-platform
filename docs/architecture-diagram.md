# Architecture Diagram

This document provides a high‑level and detailed view of the platform architecture, including microservices, observability stack, namespaces, GitOps structure, and the AI SRE Agent auto‑remediation loop.

---

## 1. High‑Level System Architecture (Mermaid)

~~~mermaid
flowchart TD
A[Client / User] --> B[API Gateway]

B --> S1[Search Service]
B --> B1[Booking Service]
B --> I1[Inventory Service]
B --> P1[Payment Service]

subgraph UI[UI Portal]
U1[Frontend SPA]
end

A --> U1
U1 --> B

subgraph SRE[AI SRE Agent]
W1[Worker Loop]
W2[Agent API Endpoints]
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
AM -->|Webhook to AI SRE Agent| W2

W2 -->|Restart / Scale / Escalate| K8S[(Kubernetes API)]
~~~

---

## 2. Kubernetes Namespace Layout

Platform namespace (`platform`):

    infra/k8s/platform/
    ├── ai-sre-agent
    ├── api-gateway
    ├── booking-service
    ├── inventory-service
    ├── payment-service
    ├── search-service
    └── ui-portal

Observability namespace (`observability`):

    infra/observability/
    ├── alertmanager
    │   └── ai-sre-agent-alerts.yaml
    ├── grafana-dashboards
    │   ├── json
    │   └── yaml
    ├── prometheus-rules
    │   ├── ai-sre-agent-rules.yaml
    │   ├── ai-sre-agent-slo-alerts.yaml
    │   └── ai-sre-agent-slo-rules.yaml
    ├── prometheus-values.yaml
    ├── loki-values.yaml
    └── promtail-values.yaml

GitOps (ArgoCD ApplicationSet):

    infra/argocd/
    └── applicationset-platform.yaml

---

## 3. Detailed Project Structure Diagram (Mermaid)

Mermaid definition (paste into a ```mermaid block in your editor):

flowchart TD

    subgraph ROOT[Repository Root]
        README[README.md]
        DOCS[docs/]
        INFRA[infra/]
        SRV[services/]
        SHARED[shared/]
    end

    subgraph DOCS
        D1[architecture.md]
        D2[architecture-diagram.md]
        D3[apis.md]
        D4[slo.md]
        D5[auto-remediation.md]
        D6[platform-overview.md]
    end

    subgraph INFRA
        ARGO[argocd/]
        K8S[k8s/]
        OBS[observability/]
    end

    subgraph ARGO
        A1[applicationset-platform.yaml]
    end

    subgraph K8S
        NS[namespaces/platform.yaml]
        PLAT[platform/]
    end

    subgraph PLAT
        P1[ai-sre-agent/]
        P2[api-gateway/]
        P3[booking-service/]
        P4[inventory-service/]
        P5[payment-service/]
        P6[search-service/]
        P7[ui-portal/]
    end

    subgraph OBS
        O1[alertmanager/]
        O2[grafana-dashboards/]
        O3[prometheus-rules/]
        O4[prometheus-values.yaml]
        O5[loki-values.yaml]
        O6[promtail-values.yaml]
    end

    subgraph SRV
        S1[ai-sre-agent/]
        S2[api-gateway/]
        S3[booking-service/]
        S4[inventory-service/]
        S5[payment-service/]
        S6[search-service/]
        S7[ui-portal/]
        S8[_template/]
    end

    subgraph SHARED
        C1[config.ts]
        C2[http.ts]
        C3[logger.ts]
        C4[metrics.ts]
        C5[types.d.ts]
    end

---

## 4. Component Responsibilities

API Gateway:
- Entry point for all client traffic  
- Routes requests to backend services  
- Exposes /metrics for Prometheus  
- Used by UI Portal  

Microservices:
- src/index.ts — main HTTP server  
- Dockerfile — container build  
- deployment.yaml — Kubernetes deployment  
- service.yaml — Kubernetes service  
- servicemonitor.yaml — Prometheus scraping  

AI SRE Agent:
- Background worker loop  
- /metrics endpoint for Prometheus  
- /analyze/incident endpoint  
- /remediate endpoint for Alertmanager webhook  
- Executes auto‑remediation actions:
  - Restart itself  
  - Scale to 2 replicas  
  - Scale to 3 replicas  
  - Escalate to humans  
- Sends Slack notifications  

Observability Stack:
- Prometheus scrapes metrics  
- Alertmanager routes alerts to Slack + AI SRE Agent  
- Grafana visualizes dashboards  
- Loki + Promtail handle logs  

GitOps (ArgoCD ApplicationSet):
- Deploys all services automatically  
- Syncs environments (dev, develop, preprod, main)  
- Ensures declarative, versioned infrastructure  

---

## 5. Auto‑Remediation Loop (Summary)

1. Prometheus detects SLO burn‑rate violations  
2. Alertmanager sends alert → Slack + AI SRE Agent  
3. AI SRE Agent:
   - Restarts itself  
   - Scales to 2 replicas  
   - Scales to 3 replicas  
   - Escalates to humans  
4. Kubernetes executes the action  
5. Slack receives confirmation  

---

## 6. Summary

This architecture diagram provides a complete view of:

- Microservices  
- Observability stack  
- Namespaces  
- GitOps structure  
- Auto‑remediation loop  
- Repository structure  
- UI Portal integration  
- AI SRE Agent integration  

It is aligned with the final working platform and CI/CD pipeline.
