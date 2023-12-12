# Use the official Node.js 16 image as the base image
FROM node:latest

# Set a range for acceptable UIDs. 
# For example, UIDs between 1000 and 9999.
# Adjust this range based on your requirements.
ARG UID_MIN=1000
ARG UID_MAX=9999

# Create a non-root user with a dynamically assigned unique UID
RUN groupadd -r webapi && \
    for uid in $(seq $UID_MIN $UID_MAX); do \
        if ! getent passwd $uid; then \
            useradd -r -g webapi -u $uid webapi; \
            break; \
        fi; \
    done
# Switch to the newly created user
USER webapi

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./




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
