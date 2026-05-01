
## API Contracts (Initial Draft)

### api-gateway

- GET /health
- GET /search
  - Query params: `q` (string), `type` (flight|hotel)
  - Calls search-service
- POST /book
  - Body: { userId, itineraryId, paymentMethod }
  - Calls booking-service

### search-service

- GET /health
- GET /search/flights
  - Query params: origin, destination, date
- GET /search/hotels
  - Query params: city, checkIn, checkOut

### booking-service

- GET /health
- POST /bookings
  - Body: { userId, itineraryId, paymentDetails }
  - Calls inventory-service + payment-service
- GET /bookings/:id

### payment-service

- GET /health
- POST /payments
  - Body: { amount, currency, method }

### inventory-service

- GET /health
- POST /inventory/reserve
  - Body: { itineraryId, count }
- POST /inventory/release
  - Body: { itineraryId, count }

### ai-sre-agent

- GET /health
- POST /analyze/incident
  - Body: {
      service: string,
      timeframe: string,
      symptoms: string,
      logsSnippet?: string,
      metricsSummary?: string
    }
  - Response: {
      probableCause: string,
      suggestedChecks: string[],
      suggestedRemediations: string[]
    }

