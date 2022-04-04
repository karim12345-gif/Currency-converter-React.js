FROM node:17-alpine AS development

#set working directory
WORKDIR /app

#add path
ENV PATH /app/node_modules/.bin:$PATH

#install app dependencies
COPY package.json .
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.0 -g --silent

#add app
COPY . ./

EXPOSE 3000
CMD ["npm", "start"]