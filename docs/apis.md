# API Contracts — travel-sre-ai-platform

This document defines the HTTP API contracts for all microservices in the platform.

All backend services expose:

* `GET /health` — basic liveness/readiness check
* `GET /metrics` — Prometheus metrics endpoint (scraped by Prometheus via ServiceMonitor)

---

# 1. api-gateway

The API Gateway is the single public entrypoint. It routes requests to the internal services and aggregates responses.

### GET /health

Health check for the gateway itself.

### GET /metrics

Prometheus metrics for the gateway.

### GET /search

Search across flights and hotels.

**Query params:**

* `q` (string) — free text query
* `type` (string) — `flight` | `hotel`

**Internal routing:**

* Proxies to `search-service`:

  * `/search/flights`
  * `/search/hotels`

### POST /book

Create a booking via the gateway.

**Body:**
{
"userId": "string",
"itineraryId": "string",
"paymentMethod": "string"
}

**Internal routing:**

* Proxies to `booking-service /bookings`

---

# 2. search-service

Responsible for searching flights and hotels.

### GET /health

Service health check.

### GET /metrics

Prometheus metrics for search-service.

### GET /search/flights

Search flights.

**Query params:**

* `origin` (string)
* `destination` (string)
* `date` (string, ISO-8601)

### GET /search/hotels

Search hotels.

**Query params:**

* `city` (string)
* `checkIn` (string, ISO-8601)
* `checkOut` (string, ISO-8601)

---

# 3. booking-service

Coordinates bookings, inventory reservation, and payments.

### GET /health

Service health check.

### GET /metrics

Prometheus metrics for booking-service.

### POST /bookings

Create a booking.

**Body:**
{
"userId": "string",
"itineraryId": "string",
"paymentDetails": {}
}

**Internal calls:**

* `inventory-service` — reserve inventory
* `payment-service` — charge payment

### GET /bookings/:id

Retrieve booking details.

**Path params:**

* `id` (string) — booking identifier

---

# 4. inventory-service

Manages inventory reservations for itineraries.

### GET /health

Service health check.

### GET /metrics

Prometheus metrics for inventory-service.

### POST /inventory/reserve

Reserve inventory for an itinerary.

**Body:**
{
"itineraryId": "string",
"count": 1
}

### POST /inventory/release

Release previously reserved inventory.

**Body:**
{
"itineraryId": "string",
"count": 1
}

---

# 5. payment-service

Simulates payment authorization and charging.

### GET /health

Service health check.

### GET /metrics

Prometheus metrics for payment-service.

### POST /payments

Process a payment.

**Body:**
{
"amount": 100.0,
"currency": "string",
"method": "string"
}

---

# 6. ai-sre-agent

The AI SRE Agent analyzes incidents, metrics, and logs to suggest probable causes and remediations. It is also wired into the SLO/alerting pipeline and exposes metrics for burn-rate alerts.

### GET /health

Service health check.

### GET /metrics

Prometheus metrics for AI SRE Agent, including:

* SLO indicators
* Error rates
* Burn-rate related metrics

### POST /analyze/incident

Analyze an incident and return SRE-focused insights.

**Body:**
{
"service": "string",
"timeframe": "string",
"symptoms": "string",
"logsSnippet": "string (optional)",
"metricsSummary": "string (optional)"
}

**Response:**
{
"probableCause": "string",
"suggestedChecks": ["string"],
"suggestedRemediations": ["string"]
}

---

# 7. ui-portal

The UI Portal is a frontend-only application (SPA) that consumes the APIs above. It does not expose its own backend HTTP API; instead, it:

* Calls `api-gateway` for business flows (search, booking)
* Calls `ai-sre-agent` (via gateway or direct internal routing) for incident analysis

**Visualizes:**

* Service health
* SLOs and error budgets
* Incident analysis results
* Deployment/version information (from image tags)

All interactions are browser → UI → gateway/agent; there are no additional public REST endpoints beyond those already documented.
