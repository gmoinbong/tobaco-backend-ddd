# ------------------------
# Stage 1: Install dependencies
# ------------------------
  FROM node:20-alpine AS deps

  WORKDIR /app
  
  COPY package*.json ./
  RUN npm ci
  
  # ------------------------
  # Stage 2: Build NestJS
  # ------------------------
  FROM node:20-alpine AS builder
  
  WORKDIR /app
  
  COPY --from=deps /app/node_modules ./node_modules
  COPY . .
  
  RUN npm run build
  
  # ------------------------
  # Stage 3: Production image
  # ------------------------
  FROM node:20-alpine AS production
  
  WORKDIR /app
  
  COPY --from=builder /app/dist ./dist
  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/package.json ./package.json
  
  # Create non-root user
  RUN addgroup -g 1001 -S nodejs && \
      adduser -S nestjs -u 1001
  
  USER nestjs
  
  # ALB / ECS ожидает, что контейнер слушает 0.0.0.0
  EXPOSE 3000
  
  # Health check для ECS/ALB
  HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=5 \
    CMD wget -qO- http://localhost:3000/api/health || exit 1
  
  # Nest build outputs to dist/src/main.js (mirrors src/ under dist)
  CMD ["node", "dist/src/main.js"]
  