import { useState } from "react";
import { ALL_BOOKS, ADD_BOOK, ALL_AUTHORS } from "../queries";
import { useApolloClient, useMutation } from "@apollo/client";
import { updateCache } from "../App";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const client = useApolloClient();

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    update: (cache, { data: { addBook } }) => {
      // For each of the genre from server, update the query in cache
      addBook.genres.forEach((g) => {
        cache.updateQuery(
          { query: ALL_BOOKS, variables: { genre: g } },
          (data) => {
            if (data) {
              // If query exists in cache, concat
              return {
                allBooks: data.allBooks.concat(addBook),
              };
            } else {
              /**
               * If query for book by genre doesn't exist in cache
               * It may actually exist on the server, but we just haven't fetched it yet
               * because we never needed it
               * (just opened app and created book, didnt filter by genre in books section yet)
               * So we should fetch that query from the server.
               */
              client.query({ query: ALL_BOOKS, variables: { genre: g } });
            }
          }
        );
      });

      // Also update all books
      updateCache(
        cache,
        { query: ALL_BOOKS, variables: { genre: null } },
        addBook
      );
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    createBook({
      variables: { title, author, published: parseInt(published), genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
