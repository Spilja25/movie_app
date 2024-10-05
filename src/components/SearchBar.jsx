import React, { useState } from "react";
import "./SearchBar.css";

const Search_API =
  "https://api.themoviedb.org/3/search/movie?api_key=2ee646676cba6f73b8e3140497d84ac2&query=";

function SearchBar({ setMovies }) {
  const [searchValue, setSearchValue] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      fetch(Search_API + searchValue)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setMovies(data.results);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        });
    }
  };

  const handleOnChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="search"
        className="search"
        value={searchValue}
        onChange={handleOnChange}
      />
    </form>
  );
}

export default SearchBar;
