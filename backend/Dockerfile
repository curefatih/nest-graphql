FROM node:16 AS builder

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN NODE_ENV=production pnpm run build

EXPOSE 5000

CMD ["pnpm", "start"]