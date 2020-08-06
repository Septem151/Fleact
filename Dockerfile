FROM node:lts-buster AS build
LABEL stage=build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --silent --prod
COPY public ./public
COPY src ./src
RUN yarn build \
    && chmod -R 755 build/

FROM nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY fleact-web.conf /etc/nginx/templates/default.conf.template
EXPOSE 80
