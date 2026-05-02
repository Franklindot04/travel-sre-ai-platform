FROM node:18-alpine

WORKDIR /app

# 1. Copy ONLY package.json first
COPY services/ui-portal/package*.json ./

# 2. Install dependencies
RUN npm install

# 3. Copy service source code
COPY services/ui-portal .

# 4. Copy shared folder
COPY shared ./shared

# 5. Build TypeScript
RUN npm run build

# 6. Copy shared TS files into dist
RUN mkdir -p dist/shared && cp -r shared/* dist/shared/

EXPOSE 3007
CMD ["node", "dist/src/index.js"]
