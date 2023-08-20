FROM node:18.16-alpine As development
WORKDIR /usr/app
COPY package*.json .
RUN npm ci
COPY . .
ENTRYPOINT ["./entrypoint.sh"]
