FROM node:16 AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN NODE_ENV=development npm run build

EXPOSE 3000

CMD ["npm", "start"]