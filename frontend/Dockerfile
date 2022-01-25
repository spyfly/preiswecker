FROM node:16-alpine AS build

WORKDIR /frontend
COPY . /frontend

ARG VUE_APP_API_URL

RUN npm i
RUN npm run build


FROM build AS final
COPY --from=build /frontend/dist /usr/share/dist

RUN npm i -g serve

ARG VUE_APP_API_URL

CMD sh -cx "serve -s /usr/share/dist -l 8080"