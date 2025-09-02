import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../Api";
import MovieCard from "../components/MovieCard";

export default function SearchResults() {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchResults() {
      const res = await axios.get(
        `/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&query=${query}`
      );
      setMovies(res.data.results);
    }
    fetchResults();
  }, [query]);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Search Results for: {query}</h2>
      <div className="search-results">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}
