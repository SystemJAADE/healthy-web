FROM node:lts-bullseye-slim AS development

RUN apt-get update && apt-get install -y procps openssl

WORKDIR /usr/src/app

COPY --chown=node:node package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY --chown=node:node . .

USER node

FROM node:lts-bullseye-slim AS build

WORKDIR /usr/src/app

COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build

FROM nginx:1.27.3 AS production

COPY --from=build /usr/src/app/dist/healthy/browser /usr/share/nginx/html
COPY ./ext/nginx.conf /etc/nginx/conf.d/default.conf
