import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useQuery } from "@apollo/client";
import Recommendations from "./components/Recommendations";
import { ME } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const { data: dataMe, refetch } = useQuery(ME);

  // console.log(data);
  useEffect(() => {
    refetch();
  }, [token]);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("library-user-token");
    if (loggedUserJSON) {
      setToken(loggedUserJSON);
    }
  }, []);

  const showHomepage = () => {
    setPage("authors");
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    showHomepage();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>Add book</button>
            <button onClick={() => setPage("recommendations")}>
              Recommendations
            </button>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>Login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <LoginForm
        showHomepage={showHomepage}
        show={page === "login"}
        setToken={setToken}
      />

      {page === "recommendations" && <Recommendations me={dataMe.me} />}
    </div>
  );
};

export default App;
