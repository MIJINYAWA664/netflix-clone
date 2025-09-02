import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../Api";
import ReactPlayer from "react-player";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      try {
        // Fetch movie details
        const request = await axios.get(
          `/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
        );
        setMovie(request.data);

        // Fetch trailers
        const videoRes = await axios.get(
          `/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
        );
        const trailer = videoRes.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer ? trailer.key : "");
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    }
    fetchMovie();
  }, [id]);

  if (!movie) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <div className="movie-details">
      {/* ✅ Trailer Player */}
      {trailerKey ? (
        <div className="trailer-container">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerKey}`}
            controls
            playing
            width="100%"
            height="500px"
          />
        </div>
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="movie-backdrop"
        />
      )}

      {/* ✅ Movie Info */}
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> ⭐ {movie.vote_average}/10</p>
        <p className="overview">{movie.overview}</p>
      </div>
    </div>
  );
}
