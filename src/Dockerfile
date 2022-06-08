FROM node:17 as build-stage

RUN apt-get update
RUN apt-get install -y curl

WORKDIR /chance

COPY ./src ./src
COPY ./nginx ./nginx
COPY ./public ./public
COPY env.d.ts index.html package.json \
  tsconfig.json tsconfig.app.json \
  tsconfig.vitest.json tsconfig.vite-config.json \
  vite.config.ts ./

RUN npm install
RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /chance/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 3456

CMD ["nginx", "-g", "daemon off;"]