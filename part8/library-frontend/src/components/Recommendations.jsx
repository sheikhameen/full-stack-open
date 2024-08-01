import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Recommendations = ({ me }) => {
  const { data, loading } = useQuery(ALL_BOOKS, {
    variables: { genre: me.favoriteGenre },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre <strong>{me.favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
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
