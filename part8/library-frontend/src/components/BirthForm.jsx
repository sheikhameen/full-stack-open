import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const BirthForm = ({ authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(authors[0].name);
  const [born, setBorn] = useState("");
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name: selectedAuthor, setBornTo: parseInt(born) },
    });

    setSelectedAuthor(authors[0].name);
    setBorn("");
  };

  return (
    <div>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <div>
          Name:
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Born:
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button>Update author</button>
      </form>
    </div>
  );
};

export default BirthForm;
