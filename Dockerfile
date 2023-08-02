FROM node:18.16-alpine
WORKDIR /usr/app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start:dev"]
