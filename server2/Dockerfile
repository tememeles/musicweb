# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.18.0
FROM node:${NODE_VERSION}-slim AS base

LABEL andasy_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install node modules
COPY package-lock.json package.json ./
RUN npm ci

# Copy application code
COPY . .

# Start the server by default, this can be overwritten at runtime
EXPOSE 3002
CMD [ "npm", "run", "start" ]
