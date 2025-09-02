import React, { useEffect, useState } from "react";
import axios, { requests } from "../Api";
import "./Banner.css";

export default function Banner() {
  const [movie, setMovie] = useState(null);

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
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner-buttons">
          <button className="banner-button">▶ Play</button>
          <button className="banner-button">+ My List</button>
        </div>

        <p className="banner-description">{movie?.overview}</p>
      </div>

      <div className="banner-fadeBottom" />
    </header>
  );
}
