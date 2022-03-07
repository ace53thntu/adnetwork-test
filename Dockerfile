# Download deps
FROM node:12 AS deps

WORKDIR /app

COPY package.json yarn.lock .yarnrc ./

RUN yarn install

# Builder
FROM deps AS builder

COPY . .

ARG YARN_BUILD=build
RUN yarn $YARN_BUILD

# Release
FROM nginx:alpine

COPY --from=builder /app/build/ /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
