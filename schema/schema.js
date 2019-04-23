const graphql = require('graphql')
const _ = require('lodash')

const { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = graphql

const books = [
  { name: 'book 1', genre: 'romance', id: '1', authorId: '1' },
  { name: 'book 2', genre: 'horor', id: '2', authorId: '2' },
  { name: 'book 3', genre: 'blah', id: '3', authorId: '3' },
  { name: 'book 4', genre: 'romance', id: '1', authorId: '1' },
  { name: 'book 5', genre: 'horor', id: '2', authorId: '2' },
  { name: 'book 6', genre: 'blah', id: '3', authorId: '3' }
]

const authors = [
  { name: 'Author 1', age: 39, id: '1' },
  { name: 'Author 2', age: 51, id: '2' },
  { name: 'Author 3', age: 23, id: '3' }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId })
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db
        return _.find(books, { id: args.id })
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id })
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})