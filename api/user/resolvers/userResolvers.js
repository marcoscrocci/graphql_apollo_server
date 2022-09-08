const userResolvers = {
    Query: {
        users: (parent, args, { dataSources }) => dataSources.usersAPI.getUsers(),
        user: (parent, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id)
    },
    Mutation: {
        addUser: async (parent, user, { dataSources }) => dataSources.usersAPI.addUser(user),
        updateUser: async (parent, user, { dataSources }) => dataSources.usersAPI.updateUser(user),
        deleteUser: async (parent, { id }, { dataSources }) => dataSources.usersAPI.deleteUser(id)
    }
}

module.exports = userResolvers