const graphql = require("graphql")
const __ = require('lodash')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const  { GraphQLError } = require ("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

  //test  
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent, args) {
       return await prisma.author.findOne({
         where: {
           id: parent.authorid
         }
       })
      },
    },
  }),
});


const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    nationality: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
  
    async resolve(parent, args) {
     return await prisma.books.findMany({
        where: {
            authorid: parent.id
          }
        })
      } 
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book:  {
      type: BookType,
      args: { id: { type: GraphQLString } },
     async resolve (parent, args) {
      return await prisma.books.findOne({
         where: {
           id: args.id
         }
       })
  
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
       return await prisma.author.findOne({
         where: {
           id: args.id
         }
       })
  
      },
    },
    books: {
      type: GraphQLList(BookType),
      async resolve(parent, args) {
       return await prisma.books.findMany()
      },
    },
    authors: {
      type: GraphQLList(AuthorType),
      async resolve(parent, args) {
        return await prisma.author.findMany()
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBook: {
      type: BookType,
      args: {
        Name: { type: new GraphQLNonNull(GraphQLString) },
        Genre: { type: new GraphQLNonNull(GraphQLString) },
        AuthorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        return await prisma.books.create({
          data: {
            name: args.Name,
            genre: args.Genre,
            author: {
              connect: {
                id: args.AuthorId,
              },
            },
          },
        });
      },
    },

    addAuthor: {
      type: AuthorType,
      args: {
        Name: { type: GraphQLString },
        nationality: { type: GraphQLString },
      },
      async resolve(parent, args) {
        try {
          return await prisma.author.create({
            data: {
              name: args.Name,
              nationality: args.nationality,
            },
          });
        } catch (error) {
          console.log(error)
          if (error.code =="P2002") {
            throw new Error({
               error:"name already exists"
             })
          }
          else {
                      throw new Error(JSON.stringify(error));

          }
        }
      }
       
      },
    },
 
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

