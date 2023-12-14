# Use the official Node.js image as the base image
FROM node:latest

# Set a range for acceptable UIDs. 
# For example, UIDs between 1000 and 9999.
# Adjust this range based on your requirements.
ARG UID_MIN=1000
ARG UID_MAX=9999

# Create a non-root user with a dynamically assigned unique UID
# Create a home directory for the user and set appropriate permissions
RUN groupadd -r webapi && \
    for uid in $(seq $UID_MIN $UID_MAX); do \
        if ! getent passwd $uid; then \
            mkdir -p /home/webapi && \
            chown $uid:$uid /home/webapi && \
            useradd -r -g webapi -u $uid -d /home/webapi webapi; \
            break; \
        fi; \
    done

# Set the working directory inside the container
WORKDIR /app

# Change ownership of the /app and /home/webapi directories to webapi user
RUN chown webapi:webapi /app && chown webapi:webapi /home/webapi

# Copy package.json and package-lock.json to the container
# Ensure that the copied files have the correct ownership
COPY --chown=webapi:webapi package*.json ./

# Switch to the newly created user
USER webapi

# Install project dependencies
RUN npm install --ignore-scripts

# Copy only the necessary files/directories to the container
# Assuming all necessary files are in the 'src' directory
# Ensure that the copied files have the correct ownership
COPY --chown=webapi:webapi src/ ./src/
# Copy server.js to the container
COPY --chown=webapi:webapi server.js ./
# Expose the port that the app will run on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
