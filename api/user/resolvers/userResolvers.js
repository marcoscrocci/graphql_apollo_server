const userResolvers = {
    Query: {
        users: (parent, args, { dataSources }) => dataSources.usersAPI.getUsers(),
        user: (parent, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id)
    }
}

module.exports = userResolvers