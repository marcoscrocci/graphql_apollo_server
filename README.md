# Curso de GraphQL

## GraphQL: construindo uma API com Apollo Server usando Docker

### Gerar a imagem a partir do Dockerfile e consultar:

docker build -t marcoscrocci/1922-graphql:1.0 .
docker image ls | grep 1922-graphql

### Gerar o container a partir da imagem gerada acima e consultar:

docker run -d --name graphql_server -v $(pwd):/home/node/app -p 3000:3000 marcoscrocci/1922-graphql:1.0
docker ps | grep graphql_server

### Se o container já existir, para iniciar:
docker start graphql_server

### Acessar o terminal do container:
docker exec -it graphql_server /bin/bash

### No terminal do container executar:
npm install
npm start


### Para executar o json-server na porta 8000, para consultar os dados (funciona apenas localmente, ou seja, fora do container):
npx json-server --watch api/data/dados.json --port 8000

