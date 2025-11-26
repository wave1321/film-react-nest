#!/bin/bash
# setup-server.sh

# Обновление системы
apt update && apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Установка Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Создание директории проекта
mkdir -p /opt/afisha
cd /opt/afisha

# Создание .env файла
cat > .env << EOF
DATABASE_NAME=prac
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_secure_password_here
PGADMIN_EMAIL=admin@admin.com
PGADMIN_PASSWORD=admin
GITHUB_REPOSITORY=yourusername/yourrepo
TAG=latest
EOF

# Копирование docker-compose.yml
# (скопируйте ваш docker-compose.yml на сервер)

# Запуск приложения
docker compose up -d

echo "Setup completed! Application is running."