# Weather API

Lightweight Express-based proxy that fetches weather data from Visual Crossing and exposes a small HTTP API for health checks and city weather lookups.

## Contents

- src/main/app.ts — express app initialization (expressLoader)
- src/server.ts — server bootstrap (startServer)
- src/dtos/response/api.response.ts — centralized error response helpers
- src/config/process-supervisor.ts — process supervision utilities
- .env.development — example environment variables

## Features

- Health check endpoint
- Weather endpoint that proxies requests to Visual Crossing
- Centralized error handling and structured responses
- Simple configuration via environment variables
- Ready for local development and production

## Endpoints

- GET /health
  - Response: { "status": "UP", "pid": <process id> }
- GET /api/v1/weather?city=<city>
  - Example: GET /api/v1/weather?city=London
  - Proxies to Visual Crossing using configured base URL and API key

## Environment (example)

Create a file named `.env` or use `.env.development` with these variables:

WEATHER_API_BASE_URL=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services
WEATHER_API_KEY=your_visualcrossing_api_key
PORT=3030
LOG_LEVEL=info

Do not commit real API keys.

## Local development (Windows)

1. Install dependencies
   - PowerShell/CMD: npm install
2. Run in development (with nodemon if configured)
   - npm run dev
3. Build and run production
   - npm run build
   - npm start

Example request:
curl "http://localhost:3030/api/v1/weather?city=London"

## Error handling & logging

- API errors are handled centrally via src/dtos/response/api.response.ts.
- Process supervision utilities are in src/config/process-supervisor.ts to help with graceful shutdowns and restarts.

## Contributing

- Fork, create a feature branch, add tests, open a PR.
- Follow existing code style and add descriptive commit messages.

## License

No License.
