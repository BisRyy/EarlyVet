# Use the Node.js base image
FROM node:18

# Set the working directory
WORKDIR /

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Expose the service port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
