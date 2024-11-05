#FROM node:lts-slim@sha256:f73e9c70d4279d5e7b7cc1fe307c5de18b61089ffa2235230408dfb14e2f0h9a0 AS base_image
FROM node:18-slim@sha256:2b1ad9885faa6627319d47b139708938d84e61f9fa218bd69649b59e06fc70f9 AS base_image
WORKDIR /usr/src/app


FROM base_image AS dev
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
USER node
EXPOSE 5173
CMD [ "npm", "run", "dev" ]

FROM base_image AS prod
ENV NODE_ENV=production 
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
# RUN npm install vite
COPY . .
# USER node
RUN npm run build

FROM nginx:mainline-alpine3.20-slim@sha256:e9293c9bedb0db866e7d2b69e58131db4c2478e6cd216cdd99b134830703983a AS deploy
WORKDIR /usr/share/nginx/html
COPY --from=prod /usr/src/app/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]