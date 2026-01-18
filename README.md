# Weather API

Lightweight Express-based proxy that fetches weather data from Visual Crossing and exposes a small HTTP API for health checks and city weather lookups.

Project link: https://roadmap.sh/projects/weather-api-wrapper-service

## Overview

This project provides a small HTTP server that:

- Exposes a health check endpoint
- Proxies weather lookups to Visual Crossing
- Uses centralized error handling and process supervision utilities

## Key files

- src/main/app.ts — Express app initialization (expressLoader)
- src/server.ts — Server bootstrap (startServer)
- src/dtos/response/api.response.ts — Centralized API error responses
- src/config/process-supervisor.ts — Graceful shutdown and restart helpers
- .env.local — Example environment variables
- .gitignore — excludes node_modules, dist, and environment files

## Features

- GET /health — basic health check
- GET /api/v1/weather?city=<city> — fetches weather for the specified city via Visual Crossing
- Centralized error responses and structured logging
- Easy local development and production build

## Environment variables

Create a `.env` or use `.env.local` with values like:

WEATHER_API_BASE_URL=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services  
WEATHER_API_KEY=your_visualcrossing_api_key  
PORT=3030  
LOG_LEVEL=info

Do not commit real API keys. The repository already ignores `.env.*` files via .gitignore.

## Local development (Windows)

1. Install dependencies:
   - PowerShell / CMD: npm install
2. Start in development (nodemon recommended):
   - npm run dev
3. Build and run production:
   - npm run build
   - npm start

Example request:
curl "http://localhost:3030/api/v1/weather?city=London"

## Scripts (recommended)

Ensure package.json contains at least:

- "dev" — start in dev mode (e.g., nodemon)
- "build" — compile/prepare for production
- "start" — run the built app
- "test" — run unit tests

## Testing & Linting

- Add unit tests for controllers and utils (suggest Jest + supertest for HTTP tests).
- Add linting (ESLint) and formatting (Prettier) as CI checks.

## Contributing

- Fork, create a feature branch, add tests, open a PR.
- Follow existing code style and include descriptive commits.

## License

Add a LICENSE file (e.g., MIT) before publishing.
