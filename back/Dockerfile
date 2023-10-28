# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory to /back
WORKDIR /back

# Copy the package.json and package-lock.json files to the image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the image
COPY . .

# Generate Prisma client (if needed)
RUN npx prisma generate


# Expose the port your application listens on (if it's 8080)
EXPOSE 8080

# Build your application (if needed)
RUN npm run build

# Start your application
CMD ["node", "dist/main.js"]