# Use the official Node.js 16 image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./



# Install project dependencies as a non-root user
RUN groupadd -r webapi && useradd -r -g webapi webapi && \
    chown -R webapi:webapi /app
USER webapi

# Install project dependencies
RUN npm install --ignore-scripts

# Copy only the necessary files/directories to the container
# Assuming all necessary files are in the 'src' or 'app' directory
COPY src/ ./src/

# Expose the port that the app will run on
EXPOSE 3000

# Start the application
# Adjust the path if using 'app' instead of 'src'
CMD ["node", "src/server.js"]
