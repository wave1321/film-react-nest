FROM node:18-bullseye AS builder
WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./

RUN npm ci --no-audit

COPY . .

RUN npm run build

# Production образ
FROM node:18-bullseye

RUN npm install -g serve

WORKDIR /app
COPY --from=builder /app/dist ./dist

# Копируем файлы в volume при запуске
CMD sh -c "cp -r /app/dist/* /app/dist-volume/ && serve -s /app/dist-volume -l 3000"