# Health

Health checks module. Health checks are used to check the state of the microservice. Currently implemented:

- Health check (returns plain text string idicating that API Gateway is working correctly)
- Ping check
- Storage check
- Heap and RSS checks
- Microservice check (with microservice name provided as parameter, i.e `auth`)

This directory contains:

- HealthModule which is a wrapper for TerminusModule
- `services` directory with HealthService and index.ts exporting that service
- `controllers` directory with HealthController and index.ts exporting that controller
