const { ApolloServer } = require('apollo-server');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const path = require('path');

const userSchema = require('./user/schema/user.graphql');
const userResolvers = require('./user/resolvers/userResolvers');
const UsersAPI = require('./user/datasource/user');

const turmaSchema = require('./turma/schema/turma.graphql');
const turmaResolvers = require('./turma/resolvers/turmaResolvers');
const TurmasAPI = require('./turma/datasource/turma');

const typeDefs = mergeTypeDefs([userSchema, turmaSchema])

// https://cursos.alura.com.br/forum/topico-typeerror-mergetypedefs-is-not-a-function-245972
const resolvers = [userResolvers, turmaResolvers]

const dbConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname, './data/database.db')
    }
};

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            usersAPI: new UsersAPI(),
            turmasAPI: new TurmasAPI(dbConfig)
        }
    }
});

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
})