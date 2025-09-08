const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql
const _ = require('lodash');
const books = [
    {name: 'half a pawpaw', genre: 'yellow', id: '1'},
    {name: 'half a mango', genre: 'yellow', id: '2' },
    {name: 'half a orange', genre: 'yellow', id: '3' },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return _.find(books, {id: args.id})
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
});