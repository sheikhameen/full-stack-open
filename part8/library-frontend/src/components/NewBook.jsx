import { useState } from "react";
import { ALL_BOOKS, ADD_BOOK, ALL_AUTHORS } from "../queries";
import { useMutation } from "@apollo/client";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    update: (cache, response) => {
      // For each of the genre from server, update the query in cache
      response.data.addBook.genres.forEach((g) => {
        cache.updateQuery(
          { query: ALL_BOOKS, variables: { genre: g } },
          (data) => {
            return {
              allBooks: data.allBooks.concat(response.data.addBook),
            };
          }
        );
      });

      // Also update all books
      cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre: null } },
        (data) => {
          return {
            allBooks: data.allBooks.concat(response.data.addBook),
          };
        }
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
