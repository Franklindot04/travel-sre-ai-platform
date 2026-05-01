# API Contracts — travel-sre-ai-platform

This document defines the HTTP API contracts for all microservices in the platform.

---

# 1. api-gateway

### GET /health
Health check.

### GET /search
Query params:
- `q` (string)
- `type` (flight | hotel)

Routes internally to:
- `search-service`

### POST /book
Body:
```
{
  "userId": string,
  "itineraryId": string,
  "paymentMethod": string
}
```

Routes internally to:
- `booking-service`

---

# 2. search-service

### GET /health
Health check.

### GET /search/flights
Query params:
- `origin`
- `destination`
- `date`

### GET /search/hotels
Query params:
- `city`
- `checkIn`
- `checkOut`

---

# 3. booking-service

### GET /health
Health check.

### POST /bookings
Body:
```
{
  "userId": string,
  "itineraryId": string,
  "paymentDetails": object
}
```

Internal calls:
- `inventory-service` (reserve)
- `payment-service` (charge)

### GET /bookings/:id
Retrieve booking details.

---

# 4. inventory-service

### GET /health
Health check.

### POST /inventory/reserve
Body:
```
{
  "itineraryId": string,
  "count": number
}
```

### POST /inventory/release
Body:
```
{
  "itineraryId": string,
  "count": number
}
```

---

# 5. payment-service

### GET /health
Health check.

### POST /payments
Body:
```
{
  "amount": number,
  "currency": string,
  "method": string
}
```

Simulates payment authorization.

---

# 6. ai-sre-agent

### GET /health
Health check.

### POST /analyze/incident
Body:
```
{
  "service": string,
  "timeframe": string,
  "symptoms": string,
  "logsSnippet": string?,
  "metricsSummary": string?
}
```

Response:
```
{
  "probableCause": string,
  "suggestedChecks": string[],
  "suggestedRemediations": string[]
}
```

The AI SRE Agent also exposes Prometheus metrics for SLOs and burn-rate alerts.

