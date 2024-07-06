# Build stage for transfer the ts file to js
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use the build js file to config the api server
FROM node:16-alpine AS server
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder ./app/build ./build
# ENV NODE_ENV=production
# ENV PORT=8080
# ENV LOGINSECRET=somesupersecretsecret
# ENV REFRESHSECRET=anothersupersecretsecret
EXPOSE 8080
CMD ["npm", "start"]