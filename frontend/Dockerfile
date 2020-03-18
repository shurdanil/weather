FROM node

WORKDIR /app/frontend/
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/frontend/
COPY public /app/frontend/public
COPY src /app/frontend/src

RUN npm install --silent
CMD ["npm", "start"]