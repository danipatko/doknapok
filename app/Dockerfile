FROM node:alpine3.15

WORKDIR /app

COPY package*.json ./

# RUN npm i
RUN npm ci --only=production && npm i --save-dev typescript @types/react @types/node

COPY ./ ./

RUN npm run build

CMD ["npm", "run", "start"]
