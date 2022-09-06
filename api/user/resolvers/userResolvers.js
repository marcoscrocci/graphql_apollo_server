const userResolvers = {
    Query: {
        users: (parent, args, { dataSources }) => dataSources.usersAPI.getUsers()
    }
}

module.exports = userResolvers