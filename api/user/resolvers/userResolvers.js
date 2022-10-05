const { GraphQLScalarType } = require('graphql');

const userResolvers = {
    RolesType: {
        ESTUDANTE: "ESTUDANTE",
        DOCENTE: "DOCENTE",
        COORDENACAO: "COORDENACAO"
    },

    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'String de data e hora no formato ISO-8601.',
        serialize: (value) => value.toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value)
    }),

    Query: {
        users: (parent, args, { dataSources }) => dataSources.usersAPI.getUsers(),
        user: (parent, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id)
    },
    Mutation: {
        addUser: async (parent, { user }, { dataSources }) => dataSources.usersAPI.addUser(user),
        updateUser: async (parent, user, { dataSources }) => dataSources.usersAPI.updateUser(user),
        deleteUser: async (parent, { id }, { dataSources }) => dataSources.usersAPI.deleteUser(id)
    },
    User: {
        matriculas: (parent, _, { dataSources }) => dataSources.matriculasAPI.matriculasLoader.load(parent.id)
    }
}

module.exports = userResolvers