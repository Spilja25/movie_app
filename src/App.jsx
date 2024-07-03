import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import Movie from './components/Movie';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Trending_API = 'https://api.themoviedb.org/3/trending/movie/week?api_key=2ee646676cba6f73b8e3140497d84ac2';
const Popular_API = 'https://api.themoviedb.org/3/movie/popular?api_key=2ee646676cba6f73b8e3140497d84ac2';
const TopRated_API = 'https://api.themoviedb.org/3/movie/top_rated?api_key=2ee646676cba6f73b8e3140497d84ac2';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('trending');

  useEffect(() => {
    fetchMovies(selectedCategory);
  }, [selectedCategory]);

  //Picking category for fetching data
  const fetchMovies = (category) => {
    let apiUrl = '';
    if (category === 'trending') {
      apiUrl = Trending_API;
    } else if (category === 'popular') {
      apiUrl = Popular_API;
    } else if (category === 'top_rated') {
      apiUrl = TopRated_API;
    }

    //Fetching data form API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => {
        console.error(`Error fetching ${category} movies:`, error);
      });
  };

  //onClick switching categories
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <nav>
        <SearchBar setMovies={setMovies} />
        <div className="buttons">
        <button onClick={() => handleCategoryClick('trending')}>Trending</button>
        <button onClick={() => handleCategoryClick('popular')}>Popular</button>
        <button onClick={() => handleCategoryClick('top_rated')}>Top Rated</button>
      </div>
      </nav>

      <div className="movie-section">
        {selectedCategory === 'trending' && movies.length > 0 && (
          <div className='movie-wrapper'>
            <h2 className='movie-title'>Trending Movies</h2>
            <div className="movie-list">
              {movies.map(movie => (
                <Movie {...movie} key={movie.id} />
              ))}
            </div>
          </div>
        )}
        {selectedCategory === 'popular' && (
          <MovieList title="Popular Movies" apiEndpoint={Popular_API} />
        )}
        {selectedCategory === 'top_rated' && (
          <MovieList title="Top Rated Movies" apiEndpoint={TopRated_API} />
        )}
      </div>
    </>
  );
}

export default App;
