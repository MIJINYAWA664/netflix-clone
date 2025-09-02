import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../Api";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      const request = await axios.get(
        `/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
      );
      setMovie(request.data);
    }
    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        style={{ width: "100%" }}
      />
    </div>
  );
}
