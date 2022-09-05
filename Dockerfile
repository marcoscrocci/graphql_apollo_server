FROM node:14.10.1-slim

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null" ]
