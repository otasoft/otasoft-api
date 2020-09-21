FROM node:12-alpine as dev

WORKDIR /usr/share/api-gateway/otasoft-api

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn run build

# COPY dist package.json ./

# RUN yarn --production

# FROM node:12-alpine

# WORKDIR /usr/share/api-gateway/otasoft-api

# COPY --from=build /usr/share/api-gateway/otasoft-api/dist ./dist

# EXPOSE 3000

# CMD ["node", "dist/main"]