# Setup
FROM node:20.18-alpine3.20 AS build
WORKDIR /gilded-sentinel
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build
FROM nginx:1-alpine-slim

# Copy the project itself
COPY --from=build /gilded-sentinel/build /usr/share/nginx/html
# Copy the env template, entrypoint script and custom NGINX configuration
COPY env.js.template /usr/share/nginx/html/env.js.template
COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY nginx.conf /etc/nginx/nginx.conf
# Set executable
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
CMD ["/docker-entrypoint.sh"]
