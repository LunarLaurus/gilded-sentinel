FROM node:20.17-alpine3.20 AS build
WORKDIR /gilded-sentinel
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

FROM nginx:1.27.1-alpine3.20
COPY --from=build /gilded-sentinel/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]