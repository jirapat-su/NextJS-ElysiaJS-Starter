# Base image using Bun
FROM imbios/bun-node:latest-18-alpine-git AS build-image
FROM oven/bun:latest AS base-image

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Builder stage: install dependencies and build the Next.js app
FROM build-image AS builder
WORKDIR /app
COPY . .
RUN bun install --verbose
RUN bun run build

# Runner stage: run the Next.js app in production
FROM base-image AS runner
WORKDIR /app

# Create and set up non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

# Set up necessary directories and permissions for Next.js
RUN mkdir -p .next && \
  chown nextjs:nodejs .next

# Copy the built application from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the non-root user
USER nextjs

# Expose the port and run the Next.js app
EXPOSE $PORT
CMD ["bun", "server.js"]
