const turmaResolvers = {
    Query: {
        turmas: (parent, args, { dataSources }) => dataSources.turmasAPI.getTurmas()
    }
}

module.exports = turmaResolvers