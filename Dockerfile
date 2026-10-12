# Multi-stage production-optimized Dockerfile serving Next.js static export
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Install a simple lightweight static file server
RUN npm install -g serve

COPY --from=builder /app/out ./out

EXPOSE 3000

# Serve the static export with real routes (/book, /quote, /services).
# NOTE: do NOT use `serve -s` (single-page mode) — it rewrites every route
# to index.html, which made /book and /quote unreachable (served the homepage).
CMD ["serve", "out", "-l", "3000"]
