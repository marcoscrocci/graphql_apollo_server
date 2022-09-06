const { ApolloServer } = require('apollo-server');
const userScheme = require('./user/schema/user.graphql');
const userResolvers = require('./user/resolvers/userResolvers');
const UsersAPI = require('./user/datasource/user');

const typeDefs = [userScheme]
const resolvers = [userResolvers]

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    dataSources: () => {
        return {
            usersAPI: new UsersAPI()
        }
    }
});

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
})