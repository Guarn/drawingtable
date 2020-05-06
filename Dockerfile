FROM node:12

RUN npm i --silent

EXPOSE 3000

CMD npm run-script start