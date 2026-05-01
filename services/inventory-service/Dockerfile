FROM node:18-alpine

WORKDIR /app

# Copy ONLY the service's package.json first
COPY services/inventory-service/package*.json ./

RUN npm install --production

# Copy the service source code
COPY services/inventory-service .

# Copy shared folder
COPY shared ./shared

# After build
RUN npm run build

# Copy shared TS files into dist/shared
RUN mkdir -p dist/shared && cp -r shared/* dist/shared/

EXPOSE 3002

CMD ["node", "dist/src/index.js"]
