FROM node:20 AS builder
WORKDIR /app

COPY ../src ./src
COPY ../package*.json ./
RUN npm install && npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/src/dist /usr/share/nginx/html