# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the backend server runs on
EXPOSE 3001

# Define environment variables for production
ENV NODE_ENV=production

# Run the backend server
CMD ["npm", "start"]
