import React, { useState, useEffect } from 'react';
import Movie from './Movie';
import '@fortawesome/fontawesome-free/css/all.min.css'; //

function MovieList({ title, apiEndpoint }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(apiEndpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => {
        console.error(`Error fetching ${title} movies:`, error);
      });
  }, [apiEndpoint, title]);

  return (
    <div>
      <h2>{title}</h2>
      <div className="movie-list">
        {movies.map(movie => (
          <Movie
            key={movie.id}
            original_title={movie.original_title}
            poster_path={movie.poster_path}
            overview={movie.overview}
            vote_average={movie.vote_average}
            vote_count={movie.vote_count}
            release_date={movie.release_date}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
