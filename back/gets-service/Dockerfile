FROM node
WORKDIR .
COPY package*.json .
RUN npm install
COPY . .
CMD node gets_app.js