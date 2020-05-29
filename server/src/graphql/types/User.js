const graphql = require('graphql');

const memberModel = require('../../models/member.model')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;
const memberType = require('./Member.js')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        name: {type: GraphQLString},

        members: {
            type: new GraphQLList(memberType),
            resolve(parent, args) {

                return memberModel.find({ userID: parent.id })
            }
        }
    })
})

module.exports = UserType;