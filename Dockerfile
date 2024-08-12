FROM node:18-alpine AS base

FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
# Omit --production flag for TypeScript devDependencies
RUN npm ci --verbose;

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ARG NEXT_PUBLIC_BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH}
ARG DOMAIN
ENV DOMAIN=${DOMAIN}

RUN npm run build;

FROM base AS production
WORKDIR /app

# ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ARG DOMAIN
ENV DOMAIN=${DOMAIN}
# ARG WEBSTORE_BASE_PATH
# ENV WEBSTORE_BASE_PATH=${WEBSTORE_BASE_PATH}
# ARG WEBSTORE_PORT
# ENV PORT=${WEBSTORE_PORT}

CMD node server.js;