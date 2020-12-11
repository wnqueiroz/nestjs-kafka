FROM node:14.15-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14.15-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG PORT=80
ENV PORT=${PORT}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["yarn", "start:prod"]
