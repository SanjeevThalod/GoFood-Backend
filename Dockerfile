
# Use the official Node.js image as the base image
FROM node:18

# Exposing the PORT
EXPOSE 5002

# Set the working directory in the container
WORKDIR /index

# Copy the application files into the working directory
COPY . /index

# Install the application dependencies
RUN npm install

# Define the entry point for the container
CMD ["npm", "start"]