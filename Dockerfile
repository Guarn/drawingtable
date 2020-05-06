FROM node:12

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /app/package.json
RUN npm install --silent

# add app
COPY . /app

EXPOSE 3000

CMD npm run-script start