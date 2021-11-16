FROM node:17-alpine
ARG DB_CONNECTION_STRING
ARG JWT_SECRET
WORKDIR /app
COPY . /app
RUN npm i
CMD npm start