FROM node:10.8-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci --silent; exit 0

COPY . /usr/src/app

ENTRYPOINT npm start

EXPOSE 3000
