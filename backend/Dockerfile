FROM node:18-bullseye AS builder

WORKDIR /app

# Копируем package файлы
COPY package*.json ./
COPY tsconfig*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Production образ
FROM node:18-bullseye AS production
WORKDIR /app

# Устанавливаем зависимости только для production
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Копируем собранное приложение
COPY --from=builder /app/dist ./dist

# Создаем пользователя для безопасности
RUN groupadd -g 1001 -r nodejs && \
    useradd -r -u 1001 -g nodejs nestjs
USER nestjs

# Переменные окружения по умолчанию
ENV NODE_ENV=production
ENV LOGGER_TYPE=json
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/main"]