FROM node:12-alpine as build

WORKDIR /usr/share/api-gateway

COPY dist package.json ./

RUN yarn --production

FROM node:12-alpine

WORKDIR /usr/share/api-gateway

COPY --from=build /usr/share/api-gateway .

EXPOSE 3000

CMD ["node", "main.js"]