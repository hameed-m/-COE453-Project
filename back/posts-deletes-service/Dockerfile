FROM node
WORKDIR .
COPY package*.json .
RUN npm install
COPY . .
CMD node posts_deletes_app.js