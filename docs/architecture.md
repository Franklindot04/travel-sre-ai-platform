# Architecture Overview

## High-level system

Client (simulated)
    |
    v
[api-gateway]
    | \
    |  \----> [search-service]
    |
    \----> [booking-service] ----> [inventory-service]
                          \
                           \----> [payment-service]

## SRE / AI components

[Kubernetes Cluster]
  - All services above
  - Observability stack:
      - Prometheus
      - Grafana
      - Loki
      - (Tempo later)
  - ai-sre-agent:
      - Reads logs/metrics (later via APIs)
      - Provides incident analysis via HTTP API

