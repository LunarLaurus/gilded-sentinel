# Stage 1: Build the React app
FROM arm64v8/node:16-alpine as build

# Set the working directory inside the container
WORKDIR /gilded-sentinel

# Copy only the package.json and package-lock.json to leverage Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the app using nginx
FROM arm64v8/nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /gilded-sentinel/build /usr/share/nginx/html

# Copy custom nginx configuration if you have one (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
