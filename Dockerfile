FROM node:20.17-alpine3.20 AS build

# Set the working directory
WORKDIR /gilded-sentinel

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy all source files
COPY . .

# Build the React app
RUN npm run build

FROM nginx:1.27.1-alpine3.20

# Copy the build files from the previous stage
COPY --from=build /gilded-sentinel/build /usr/share/nginx/html

# Copy the custom NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
