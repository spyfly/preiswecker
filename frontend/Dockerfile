FROM alpine:3.15 AS build


WORKDIR /frontend
COPY . /frontend

ARG VUE_APP_API_URL

RUN apk update
RUN apk add nodejs npm
RUN apk upgrade
RUN npm install
RUN npm run build


FROM build AS final
COPY --from=build /frontend/dist /usr/share/dist

RUN apk add nodejs npm
RUN npm i serve

ARG VUE_APP_API_URL

CMD sh -cx "npx serve -s /usr/share/dist -l 8080"