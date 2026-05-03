# API Contracts — travel-sre-ai-platform

This document defines the HTTP API contracts for all microservices in the platform.  
All backend services expose:

- GET /health — liveness/readiness  
- GET /metrics — Prometheus metrics (scraped via ServiceMonitor)

---

# 1. api-gateway

The single public entrypoint. Routes traffic to internal services and is consumed by the UI Portal.

### GET /health
Gateway health check.

### GET /metrics
Prometheus metrics.

### GET /search
Unified search endpoint.

Query params:
- q: string  
- type: flight | hotel

Internal routing:
- search-service → /search/flights  
- search-service → /search/hotels  

### POST /book
Create a booking.

Body:
{
  "userId": "string",
  "itineraryId": "string",
  "paymentMethod": "string"
}

Internal routing:
- booking-service → /bookings

---

# 2. search-service

Provides flight and hotel search.

### GET /health
Service health.

### GET /metrics
Prometheus metrics.

### GET /search/flights
Search flights.

Query params:
- origin  
- destination  
- date (ISO-8601)

### GET /search/hotels
Search hotels.

Query params:
- city  
- checkIn (ISO-8601)  
- checkOut (ISO-8601)

---

# 3. booking-service

Coordinates booking creation, inventory reservation and payment.

### GET /health
Service health.

### GET /metrics
Prometheus metrics.

### POST /bookings
Create a booking.

Body:
{
  "userId": "string",
  "itineraryId": "string",
  "paymentDetails": {}
}

Internal calls:
- inventory-service → reserve  
- payment-service → charge  

### GET /bookings/:id
Retrieve booking details.

---

# 4. inventory-service

Manages inventory reservations.

### GET /health
Service health.

### GET /metrics
Prometheus metrics.

### POST /inventory/reserve
Reserve seats/rooms.

Body:
{
  "itineraryId": "string",
  "count": 1
}

### POST /inventory/release
Release reserved inventory.

Body:
{
  "itineraryId": "string",
  "count": 1
}

---

# 5. payment-service

Simulates payment authorization.

### GET /health
Service health.

### GET /metrics
Prometheus metrics.

### POST /payments
Process a payment.

Body:
{
  "amount": 100.0,
  "currency": "string",
  "method": "string"
}

---

# 6. ai-sre-agent

Analyzes incidents, logs and metrics. Integrated with SLOs, burn‑rate alerts and auto‑remediation.

### GET /health
Service health.

### GET /metrics
Prometheus metrics including:
- SLO indicators  
- Error rates  
- Burn-rate alert metrics  
- Worker loop metrics  

### POST /analyze/incident
Analyze an incident.

Body:
{
  "service": "string",
  "timeframe": "string",
  "symptoms": "string",
  "logsSnippet": "string (optional)",
  "metricsSummary": "string (optional)"
}

Response:
{
  "probableCause": "string",
  "suggestedChecks": ["string"],
  "suggestedRemediations": ["string"]
}

### POST /remediate
Called by Alertmanager webhook.

Body:
{
  "alertName": "string",
  "severity": "string",
  "service": "string",
  "description": "string"
}

Actions performed:
- Restart itself  
- Scale to 2 replicas  
- Scale to 3 replicas  
- Escalate to humans via Slack  

---

# 7. ui-portal

Frontend SPA for platform observability and user flows.  
It does not expose backend APIs.

It consumes:
- api-gateway (search, booking)  
- ai-sre-agent (incident analysis)  
- Prometheus-backed dashboards (via gateway or internal routing)

UI features:
- Service health visualization  
- SLO & error budget dashboards  
- Deployment version display (from image tags)  
- Incident analysis viewer  

No additional REST endpoints exist for this service.
