FROM node:18-alpine

ARG NEWS_API_KEY
ENV NEWS_API_KEY=${NEWS_API_KEY}

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
