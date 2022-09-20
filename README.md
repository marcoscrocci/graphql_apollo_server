# Curso de GraphQL

## GraphQL: construindo uma API com Apollo Server usando Docker

### Gerar a imagem a partir do Dockerfile e consultar:

docker build -t marcoscrocci/graphql_apollo_server:1.0 .
docker image ls | grep graphql_apollo_server

### Gerar o container a partir da imagem gerada acima, apontando para porta padrão do GraphQL e consultar:

docker run -d --name graphql_apollo_server -v $(pwd):/home/node/app -p 4000:4000 marcoscrocci/graphql_apollo_server:1.0
docker ps | grep graphql_apollo_server

### Se o container já existir, para iniciar:
docker start graphql_apollo_server

### Acessar o terminal do container:
docker exec -it graphql_apollo_server /bin/bash

### No terminal do container executar:
npm install

npm start


### Para executar o json-server, para consultar os dados (funciona apenas localmente, ou seja, fora do container):
npx json-server --watch api/data/dados.json

### Instalando o GraphQL e o Apollo Server

Na pasta do projeto, executar o comando:

npm install graphql

npm install apollo-server

### Criar o Server do GraphQL

Criar o arquivo /api/index.js

### Documentação

https://www.apollographql.com/docs/apollo-server/getting-started/

### Para executar a API:
npm start

### Para funcionar as requisições da API no Playground do GraphQL, devemos executar em dois terminais:
1) npx json-server --watch api/data/dados.json
2) npm start


