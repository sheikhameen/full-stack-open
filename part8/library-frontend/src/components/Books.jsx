import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);

  // Query to initialise genres
  const { data: booksData } = useQuery(ALL_BOOKS, {
    variables: { genre: null },
  });

  // Update genres when booksData changes
  useEffect(() => {
    if (booksData) {
      const genreSet = new Set();
      booksData.allBooks.forEach((b) => {
        b.genres.forEach((g) => {
          genreSet.add(g);
        });
      });
      setGenres([...genreSet]);
    }
  }, [booksData]);

  // Query to filter by genre
  const resultBooks = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  if (!props.show) {
    return null;
  }
  if (resultBooks.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {resultBooks.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setSelectedGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>All Genres</button>
      </div>
    </div>
  );
};

export default Books;
