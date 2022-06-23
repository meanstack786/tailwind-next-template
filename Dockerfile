# Install dependencies only when needed
# FROM node:16-alpine AS deps
FROM node:16-alpine
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci
COPY . .
RUN rm -rf .next
RUN npm run build
EXPOSE 3000


CMD ["npm","run", "start"]