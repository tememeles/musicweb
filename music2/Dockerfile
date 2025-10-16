# --- Build stage ---
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000

# Listen on all IPv6 (and IPv4) addresses
CMD ["npx", "vite", "preview", "--host", "::", "--port", "3000"]