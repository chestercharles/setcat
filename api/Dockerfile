FROM node:lts-alpine

WORKDIR /api

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn compile

CMD [ "yarn", "start:dev" ]
