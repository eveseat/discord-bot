FROM node:15-alpine3.10

RUN apk update --no-cache && \
    apk add git

RUN cd / && \
    git clone https://github.com/eveseat/discord-bot && \
    cd discord-bot && \
    npm i && \
    npm run build

WORKDIR /discord-bot

ADD docker-entrypoint.sh /

RUN npm i && \
    npm run build

CMD [ "/docker-entrypoint.sh" ]
