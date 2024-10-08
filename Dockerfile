FROM node:18-alpine as build-stage

WORKDIR /app

COPY package.json .

RUN npm install ajv --save-dev --legacy-peer-deps
RUN npm install --legacy-peer-deps
COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build


FROM nginx:1.17.0-alpine

COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80

CMD nginx -g 'daemon off;'
