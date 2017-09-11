FROM node:6
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev libkrb5-dev
RUN mkdir /app
WORKDIR /app
ADD package.json /app/package.json
ADD config /app/config
ADD src /app/src
RUN npm install
ADD . /app

EXPOSE 10010