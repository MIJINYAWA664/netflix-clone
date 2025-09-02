import React, { useEffect, useState } from "react";
import axios, { requests } from "../Api";
import "./Banner.css";
import TrailerModal from "./TrailerModal";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const [movie, setMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
    }
    fetchData();
  }, []);

 
  return (
    <header className="banner" style={{ backgroundSize: "cover",
      backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
      backgroundPosition: "center center" }}>
      
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner-buttons">
          {/* ✅ Play Button opens Watch page */}
          <button
            className="banner-button"
            onClick={() => navigate(`/watch/${movie?.id}`)}
          >
            
            <button
  className="banner-button"
  onClick={() => {
    // ✅ Save movie to continue watching
    const continueList = JSON.parse(localStorage.getItem("continueWatching")) || [];
    const newMovie = {
      id: movie?.id,
      title: movie?.title || movie?.name,
      poster: `https://image.tmdb.org/t/p/w300${movie?.poster_path}`,
    };
    // Prevent duplicates
    const updatedList = [newMovie, ...continueList.filter((m) => m.id !== movie?.id)];
    localStorage.setItem("continueWatching", JSON.stringify(updatedList));

    // Navigate to Watch page
    navigate(`/watch/${movie?.id}`);
  }}
>
  ▶ Play
</button>

            ▶ Play
          </button>
          <button className="banner-button">+ My List</button>
          <button
            className="banner-button"
            onClick={() => setShowTrailer(true)}
          >
            🎬 Play Trailer
          </button>
        </div>

        <p className="banner-description">{movie?.overview}</p>
      </div>

      <div className="banner-fadeBottom" />

      {showTrailer && (
        <TrailerModal
          movieId={movie?.id}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </header>
  );
}
