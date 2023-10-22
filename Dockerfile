FROM node:18.16-alpine As development
WORKDIR /usr/app
COPY package*.json .
COPY . .
RUN npm ci
# RUN chmod +x entrypoint.sh
RUN npx prisma migrate deploy
RUN npx prisma db seed
RUN npm run build
# ENTRYPOINT ["./entrypoint.sh"]
CMD [ "npm", "run", "start:prod" ]
