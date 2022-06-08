FROM node:17 as build-stage

RUN apt-get update
RUN apt-get install -y curl

WORKDIR /chance

COPY . .

RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /chance/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3456

CMD ["nginx", "-g", "daemon off;"]