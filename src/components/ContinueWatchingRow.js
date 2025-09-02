import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Row.css";

export default function ContinueWatchingRow() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("continueWatching")) || [];
    setMovies(stored);
  }, []);

  if (movies.length === 0) return null; // nothing to show

  return (
    <div className="row">
      <h2>Continue Watching</h2>
      <div className="row-posters">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="row-poster"
            onClick={() => navigate(`/watch/${movie.id}`)}
          >
            <img src={movie.poster} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
