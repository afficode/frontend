FROM node:20.20-alpine3.23 AS build-stage


ARG VITE_NODE_ENV
ARG VITE_FRONTEND_URL
ARG VITE_BACKEND_URL
ENV VITE_NODE_ENV $VITE_NODE_ENV
ENV VITE_FRONTEND_URL $VITE_FRONTEND_URL
ENV VITE_BACKEND_URL $VITE_BACKEND_URL

WORKDIR /app
RUN echo "VITE_ENV=$VITE_NODE_ENV" > /app/.env
RUN echo "VITE_FRONTEND_URL=$VITE_FRONTEND_URL" >> /app/.env
RUN echo "VITE_BACKEND_URL=$VITE_BACKEND_URL" >> /app/.env

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build


FROM node:20-alpine
WORKDIR /app
RUN echo '{"type": "module"}' > package.json
ENV NODE_ENV=production
ENV PORT=80
RUN npm install --omit=dev --no-package-lock --no-audit --no-fund \
    cors express@4 prerender-node express-rate-limit helmet dotenv \
    && npm cache clean --force
COPY --from=build-stage /app/dist ./dist
COPY server.js .

EXPOSE 80

CMD ["node", "server.js"]
