FROM node
WORKDIR .
COPY package*.json .
RUN npm install cors express express-graphql graphql mongoose
COPY . .
CMD node graphql_app.js