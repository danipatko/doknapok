FROM node:alpine3.15

WORKDIR /app

COPY package*.json .

RUN npm i
# RUN npm ci --only=production

COPY . .

CMD ["npm", "run", "dev"]