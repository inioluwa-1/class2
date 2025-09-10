const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} = graphql;
const _ = require("lodash");

let books = [
  { name: "Book1", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "Book2", genre: "Science Fiction", id: "2", authorId: "2" },
  { name: "Book3", genre: "Horror", id: "3", authorId: "3" },
  { name: "Book4", genre: "Romance", id: "4", authorId: "4" },
];

let authors = [
  { name: "Author1", age: 44, id: "1" },
  { name: "Author2", age: 55, id: "2" },
  { name: "Author3", age: 33, id: "3" },
  { name: "Author4", age: 25, id: "4" },
];

const authorType = new graphql.GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: graphql.GraphQLInt },
    book: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, {authorId: parent.id})
      }
    }
  }),
});

const BookType = new graphql.GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type:authorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, {id:parent.authorId})
      }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
        // return BookModel.findById(args.id)
      },
    },
    author: {
      type: authorType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
        // return AuthorModel.findById(args.id)
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
        // return BookModel.find({})
      },
    },
    authors: {
      type: new GraphQLList(authorType),
      resolve(parent, args) {
        return authors;
        // return AuthorModel.find({})
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});