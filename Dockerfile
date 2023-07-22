# Build stage: Use Node.js image based on Alpine Linux
FROM node:14-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json, yarn.lock, and .yarnrc to the working directory

COPY package.json yarn.lock ./

# Install application dependencies using Yarn

RUN yarn install

# Copy the remaining files and directories of the project
COPY . .

# Build the React application for production using Yarn
RUN yarn build

# Deployment stage: Use Nginx image based on Alpine Linux
FROM nginx:stable-alpine

# Set image metadata
LABEL org.opencontainers.image.source https://github.com/brandalx/Brio-front-end-client/

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx configuration
COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Open port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]