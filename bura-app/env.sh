#!/bin/sh

# Заменяем переменные окружения в собранных файлах
for file in /usr/share/nginx/html/static/js/main.*.js; do
  # Подставляем все переменные окружения, начинающиеся с REACT_APP_
  for key in $(env | grep '^REACT_APP_'); do
    varname=$(echo "$key" | cut -d'=' -f1)
    value=$(echo "$key" | cut -d'=' -f2-)
    sed -i "s|%${varname}%|${value}|g" $file
  done
done
