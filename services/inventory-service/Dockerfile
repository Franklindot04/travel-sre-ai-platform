FROM node:18-alpine

WORKDIR /app

# 1. Copy ONLY package.json first
COPY services/inventory-service/package*.json ./

# 2. Install ALL dependencies (dev + prod)
RUN npm install

# 3. Copy service source code
COPY services/inventory-service .

# 4. Copy shared folder
COPY shared ./shared

# 5. Build TypeScript
RUN npm run build

# 6. Copy shared TS files into dist
RUN mkdir -p dist/shared && cp -r shared/* dist/shared/

EXPOSE 3000
CMD ["node", "dist/src/index.js"]
