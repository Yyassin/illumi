const graphql = require('graphql');
const userType = require('./User');
const userModel = require('../../models/user.model')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

module.exports = new GraphQLObjectType({
    name: 'Member',
    fields: () => ({
        id: { type: GraphQLID },
        role: {type: GraphQLString},

        user: {
            type: userType,
            resolve(parent, args) {
                return userModel.findById(parent.userId)
            }
        }
    })
})