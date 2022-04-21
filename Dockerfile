# syntax=docker/dockerfile:1.2-labs

FROM node:16-alpine as BUILD_IMAGE
RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY ./ ./

RUN npm install
# CMD [ "npm", "run", "dev" ]

RUN npm run build
RUN rm -rf node_modules
RUN npm install --production

FROM node:16-alpine
ENV NODE_ENV production
RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY --from=BUILD_IMAGE /usr/app ./

# COPY --from=BUILD_IMAGE /usr/app/node_modules ./node_modules
# COPY --from=BUILD_IMAGE /usr/app/package.json ./
# COPY --from=BUILD_IMAGE /usr/app/package-lock.json ./
# COPY --from=BUILD_IMAGE /USR/APP/.env .
# COPY --from=BUILD_IMAGE /usr/app/public ./public
# COPY --from=BUILD_IMAGE /usr/app/.next ./.next

CMD ["npm", "start"]


