import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ALL_BOOKS, ME } from "../queries";

const Recommendations = ({ show }) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null);
  const resultMe = useQuery(ME, {
    onCompleted: (data) => {
      if (data.me) {
        setFavoriteGenre(data.me.favoriteGenre);
      }
    },
  });
  const resultGenreBooks = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  });

  if (!show) {
    return null;
  }
  if (resultMe.loading || resultGenreBooks.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {resultGenreBooks.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
