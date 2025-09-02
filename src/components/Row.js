import React, { useEffect, useRef, useState } from "react";
import axios from "../Api";
import MovieCard from "./MovieCard";
import "./Row.css";

export default function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row-container">
        {/* Left Arrow */}
        <button className="row-arrow left" onClick={() => scroll("left")}>
          ◀
        </button>

        {/* Posters */}
        <div className="row-posters" ref={rowRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Right Arrow */}
        <button className="row-arrow right" onClick={() => scroll("right")}>
          ▶
        </button>
      </div>
    </div>
  );
}
