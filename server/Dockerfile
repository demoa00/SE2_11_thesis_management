# Development Stage
FROM node:18 AS development

# Set the working directory in the development stage
WORKDIR /usr/src/server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN rm -rf node_modules && npm install --quiet --ignore-scripts

# Copy the rest of the code
COPY . .

# Set the environment variable
ENV DOCKER_CONFIG 'DOCKER'

# Expose the port on which the server will listen for requests
EXPOSE 3000

# Command to start the development server
CMD ["npm", "start"]

# Production Stage
FROM node:18-alpine3.18 AS production

# Set the working directory in the production stage
WORKDIR /usr/src/server

# Copy only necessary files for production
COPY package*.json ./
RUN npm ci --quiet --only=production

# Copy the rest of the code
COPY . .

# Set the environment variable
ENV DOCKER_CONFIG 'DOCKER'

# Expose the port on which the server will listen for requests
EXPOSE 3000

# Command to start the production server
CMD ["node", "index.js"]