FROM node
WORKDIR .
COPY package*.json ./
RUN yarn install -g
COPY . .
EXPOSE 1234
# CMD [ "yarn", "run", "parcel", "./app.js" ]
CMD yarn run parcel ./app.js