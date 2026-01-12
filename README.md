# Weather API

Lightweight Express-based proxy to the Visual Crossing Weather API. Provides a small HTTP API for health checks and fetching weather data for a given city. Configuration is read from environment variables (see [.env.development](.env.development)).

## Features
- Health check endpoint: GET /health
- Weather endpoint: GET /api/v1/weather?city=<city>
- Centralized error responses via [`errorResponse`](src/dtos/response/api.response.ts)
- Server bootstrap in [`startServer`](src/server.ts) and app initialization in [`expressLoader`](src/main/app.ts)
- Process supervision via [`ProcessSupervisor`](src/config/process-supervisor.ts)

## Endpoints
- GET /health
  - Response: { "status": "UP", "pid": <process id> }
- GET /api/v1/weather?city=London
  - Proxies to Visual Crossing using the configured base URL and API key.

## Environment
Required environment variables (see [.env.development](.env.development)):
- WEATHER_API_BASE_URL — Visual Crossing base URL
- WEATHER_API_KEY — Visual Crossing API key
- PORT — server port (default 3030)

## Example
Fetch weather for London: