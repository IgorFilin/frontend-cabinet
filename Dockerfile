FROM node:18 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# этап production (production stage)
FROM nginx:stable-alpine as production-stage
COPY conf/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/personal_cabinet/browser /var/cabinet/html

EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]