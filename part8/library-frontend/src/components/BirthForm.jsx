import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const BirthForm = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: parseInt(born) } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <div>
          Name:
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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
