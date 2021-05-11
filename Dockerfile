FROM node:alpine as builder

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

FROM nginx as nginx

COPY --from=builder /app/dist /usr/share/nginx/html
