FROM node:8

# Create app directory
WORKDIR .

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN yarn 
#RUN yarn build
# If you are building your code for production
RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "run" ,"docker"]
