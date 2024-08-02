import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import Recommendations from "./components/Recommendations";
import { ALL_BOOKS, BOOK_ADDED, ME } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const { data: dataMe, refetch } = useQuery(ME);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      alert(`"${addedBook.title}" added!`);

      updateCache(
        client.cache,
        { query: ALL_BOOKS, variables: { genre: null } },
        addedBook
      );
      // client.cache.updateQuery(
      //   { query: ALL_BOOKS, variables: { genre: null } },
      //   ({ allBooks }) => {
      //     return {
      //       allBooks: allBooks.concat(addedBook),
      //     };
      //   }
      // );
    },
  });

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
