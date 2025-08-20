# Use an official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy rest of the backend code
COPY . .

# Expose app port
EXPOSE 5000

# Use production .env file
ENV NODE_ENV=production

# Start the server
# CMD ["node", "server.js"]
CMD ["npm", "start"]
