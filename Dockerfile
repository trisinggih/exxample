FROM node:20-alpine AS base
WORKDIR /app

FROM base AS build
COPY . .
RUN npm install
RUN npm run build

FROM base AS release
COPY --from=build /app/.nuxt /app/.nuxt
COPY --from=build /app/.output /app/.output

EXPOSE 3000

CMD [ "node", "/app/.output/server/index.mjs" ]