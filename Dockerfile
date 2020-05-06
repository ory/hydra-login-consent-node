FROM node:10.8-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci --silent; exit 0

COPY . /usr/src/app

ENTRYPOINT npm start

EXPOSE 3000


#docker run --env HYDRA_ADMIN_URL=https://gateway.k8s-dev.avamonitoring.dev --env KRATOS_PUBLIC_URL=https://gateway.k8s-dev.avamonitoring.dev --env PORT=4000 -p 4000:4000 login
#docker build . -t login
#