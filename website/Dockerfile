# ---- Base ----
FROM node:22-alpine AS base

WORKDIR /app
COPY package*.json ./

# ---- Development ----
FROM base AS dev
ENV NODE_ENV=development
RUN npm ci --no-audit --no-fund
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]

# ---- Build ----
FROM base AS builder
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# ---- Production ----
FROM node:22-alpine AS prod
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
USER node
CMD ["node", "server.js"]
