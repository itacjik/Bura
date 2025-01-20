# Базовый образ для разработки и сборки
FROM node:18-alpine as base

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Стадия разработки
FROM base as development

# Устанавливаем зависимости для разработки
RUN npm install

# Копируем исходный код
COPY . .

# Стадия сборки
FROM base as builder

# Устанавливаем зависимости для продакшн
RUN npm ci

# Копируем исходный код
COPY . .

# Генерируем карты и собираем приложение
RUN npm run generate-cards && npm run build

# Стадия продакшн
FROM nginx:alpine as production

# Копируем собранное приложение
COPY --from=builder /app/build /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Добавляем скрипт для подстановки переменных окружения
COPY env.sh /docker-entrypoint.d/40-env.sh
RUN chmod +x /docker-entrypoint.d/40-env.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
