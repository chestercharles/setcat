FROM node:lts-alpine

WORKDIR /api

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

CMD [ "yarn", "start:dev" ]
