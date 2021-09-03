FROM node:14.4.0-alpine3.12 As back

# Directory to hold the application
WORKDIR /usr/src/app

COPY ./back-end/package*.json ./

# install dependencies (both dev and prod) to be used as a builder for the app
RUN npm install

# copy the rest of the files
COPY ./back-end .

RUN npm run build

FROM node:14.4.0-alpine3.12 As front

# Directory to hold the application
WORKDIR /usr/src/app

COPY ./front-end/package*.json ./

# install dependencies (both dev and prod) to be used as a builder for the app
RUN npm install

# copy the rest of the files
COPY ./front-end .

RUN npm install -g @angular/cli

RUN ng build --prod

FROM node:14.4.0-alpine3.12 as production

# env var to be passed at build time
ARG NODE_ENV=production
ARG PORT=3000
# env var for build stage, will persist when run and can be changed while running
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ./back-end/package*.json ./

RUN npm install --only=production

COPY ./back-end .

COPY --from=back /usr/src/app/dist ./dist
COPY --from=front /usr/src/app/dist ./dist/front-end

CMD ["node", "dist/main"]
