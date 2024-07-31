const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

const Book = require("./models/book");
const Author = require("./models/author");
const { GraphQLError } = require("graphql");

console.log("connecting to", MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `#graphql
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(title:String!, author:String!, published:Int!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      let books = Book.find({}).populate("author");

      if (args.genre) {
        books = books.find({ genres: args.genre });
      }

      if (args.author) {
        const author = await Author.find({ name: args.author });
        books = books.find({ author });
      }

      return books;
    },
    allAuthors: async () => Author.find({}),
  },
  Mutation: {
    addBook: async (root, args) => {
      // Find author / Create author
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author, born: null });

        await author.save().catch((error) => {
          throw new GraphQLError("Creating author failed.", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        });
      }

      // Create new book with author
      const book = new Book({ ...args, author });
      return book.save().catch((error) => {
        throw new GraphQLError("Creating book failed.", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      });
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });

      if (!author) return null;

      author.born = args.setBornTo;
      return author.save();
    },
  },

  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      return Book.countDocuments({ author });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
