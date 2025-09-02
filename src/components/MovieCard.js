import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <img
        className="movie-card"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title || movie.name}
      />
    </Link>
  );
}
