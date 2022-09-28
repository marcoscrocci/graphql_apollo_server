const { GraphQLScalarType } = require("graphql");

const turmaResolvers = {
    DateTime: new GraphQLScalarType({
        name: "DateTime",
        description: "string de data e hora no formato ISO-8601",
        serialize: value => new Date(value).toISOString(),
        parseValue: value => new Date(value),
        parseLiteral: ast => new Date(ast.value).toISOString()
    }),

    Query: {
        turmas: (parent, args, { dataSources }) =>
            dataSources.turmasAPI.getTurmas(),
        turma: (parent, { id }, { dataSources }) =>
            dataSources.turmasAPI.getTurma(id)
    },

    Mutation: {
        addTurma: (parent, { turma }, { dataSources }) =>
            dataSources.turmasAPI.addTurma(turma),
        updateTurma: (parent, novosDados, { dataSources }) =>
            dataSources.turmasAPI.updateTurma(novosDados),
        deleteTurma: (parent, { id }, { dataSources }) =>
            dataSources.turmasAPI.deleteTurma(id)
    },

    Turma: {
        matriculas: (parent, args, { dataSources }) => dataSources.matriculasAPI.getMatriculasPorTurma(parent.id),
        docente: (parent, args, { dataSources }) => dataSources.usersAPI.getUserById(parent.docente_id)
    }
};

module.exports = turmaResolvers;
