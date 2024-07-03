import React from 'react';
import "./MovieList.css";

const ImageApi = 'https://image.tmdb.org/t/p/w500';

const Movie = ({
  original_title,
  poster_path,
  overview,
  vote_average,
  vote_count,
  release_date
}) => {
  return (
    <div className="movie-card">
      <img className="movie-img" src={`${ImageApi}${poster_path}`} alt={original_title} />
      <div className="movie-info">
        <h2>{original_title}</h2>
        <div className="wrapper">
          <span>Rating: {vote_average} <i className="fas fa-star"></i></span>
          <span>Vote Count: {vote_count} <i className="fas fa-thumbs-up"></i></span>
        </div>
      </div>
      <div className="movie-overview">
        <h3>Overview:</h3>
        <p>{overview}</p>
        <small>Release Date: {release_date}</small>
      </div>
    </div>
  );
};

export default Movie;
