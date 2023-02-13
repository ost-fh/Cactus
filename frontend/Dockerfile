# https://mherman.org/blog/dockerizing-a-react-app/
# build environment
FROM node:19-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf



EXPOSE 80

WORKDIR /usr/share/nginx/html
COPY ./inject-env-at-runtime.sh .
RUN chmod +x inject-env-at-runtime.sh

CMD ["/bin/sh", "-c", "/usr/share/nginx/html/inject-env-at-runtime.sh && nginx -g \"daemon off;\""]
