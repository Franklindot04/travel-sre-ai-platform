FROM node:18-alpine

WORKDIR /app

# Copy ONLY the service's package.json first
COPY services/ui-portal/package*.json ./

# Install ALL dependencies (including devDependencies)
RUN npm install

# Copy the service source code
COPY services/ui-portal .

# Copy shared folder
COPY shared ./shared

# Build TypeScript
RUN npm run build

# Copy shared TS files into dist/shared
RUN mkdir -p dist/shared && cp -r shared/* dist/shared/

EXPOSE 3007

CMD ["node", "dist/src/index.js"]
