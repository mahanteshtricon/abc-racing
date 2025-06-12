# features/

Contains **feature-specific modules**. Each feature should be a self-contained folder with its own components, hooks, services, types, and tests.

## Structure Example
features/
TopRacers/
TopRacers.tsx
useTopRacers.ts
topRacers.service.ts
topRacers.types.ts
topRacers.test.tsx


## Guidelines
- Use domain-driven naming.
- Ensure feature modules are lazily loaded when possible.
- Co-locate tests and types.

