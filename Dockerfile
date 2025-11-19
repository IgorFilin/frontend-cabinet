FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:stable-alpine AS runner

COPY conf/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/personal_cabinet/browser /var/cabinet/html

EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]