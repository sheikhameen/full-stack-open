import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [selectedGenre, setSelectedGenre] = useState(null); // null = nothing selected = all genres

  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>Loading...</div>;
  }

  const allBooks = result.data.allBooks;

  const booksToShow =
    selectedGenre !== null
      ? allBooks.filter((b) => b.genres.includes(selectedGenre))
      : allBooks;

  const genreSet = new Set();
  allBooks.map((b) => {
    b.genres.forEach((g) => {
      genreSet.add(g);
    });
  });

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
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {[...genreSet].map((g) => (
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
