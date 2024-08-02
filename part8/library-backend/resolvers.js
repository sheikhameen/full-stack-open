const Book = require("./models/book");
const Author = require("./models/author");

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
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("You are not allowed to add a book", {
          extensions: {
            code: "UNAUTHORISED",
          },
        });
      }

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
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("You are not allowed to edit authors.", {
          extensions: {
            code: "UNAUTHORISED",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) return null;

      author.born = args.setBornTo;
      return author.save();
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },

  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      return Book.countDocuments({ author });
    },
  },
};

module.exports = resolvers;
