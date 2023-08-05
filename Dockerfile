# Use a base image with Node.js installed
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY . /app

# Install dependencies
RUN npm install --legacy-peer-deps

# Build the React app
RUN npm run build

# Set the command to start the server
CMD ["npm", "run", "dev"]

# Expose port 5173
EXPOSE 5173
