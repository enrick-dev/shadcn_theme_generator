FROM node:21-slim

WORKDIR /home/node/app

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]