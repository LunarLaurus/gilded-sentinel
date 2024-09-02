FROM node:20.17-alpine3.20 AS build
WORKDIR /gilded-sentinel
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build
FROM nginx:1.27.1-alpine3.20
# Copy the project itself
COPY --from=build /gilded-sentinel/build /usr/share/nginx/html

# Copy the env template and entrypoint script
COPY env.js.template /usr/share/nginx/html/env.js.template
COPY docker-entrypoint.sh /docker-entrypoint.sh
# Copy the custom NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Make sure the script is executable
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

CMD ["/docker-entrypoint.sh"]
