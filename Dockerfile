FROM node:12-alpine as build

WORKDIR /usr/share/otasoft-api

COPY dist package.json ./

RUN yarn --production

FROM node:12-alpine

WORKDIR /usr/share/otasoft-api

COPY --from=build /usr/share/otasoft-api .

EXPOSE 3000

CMD ["node", "main.js"]