FROM node:12
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

ENV PORT=3000
ENV HOST='db'
ENV DB_USER='root'
ENV DB_PASS='admin'
ENV DB_DATABASE='uklon'
EXPOSE 3000

CMD ["npm", "start"]