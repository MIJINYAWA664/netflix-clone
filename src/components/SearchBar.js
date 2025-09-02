import React, { useState, useEffect } from "react";
import axios from "../Api";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import "./SearchBar.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const navigate = useNavigate();

  // Fetch suggestions as user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length > 2) {
        try {
          const res = await axios.get(
            `/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&query=${query}`
          );
          setSuggestions(res.data.results.slice(0, 6));
        } catch (err) {
          console.error("Search error:", err);
        }
      } else {
        setSuggestions([]);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Fetch trailer when hovering
  useEffect(() => {
    if (!hoveredMovie) return;

    const fetchTrailer = async () => {
      try {
        const res = await axios.get(
          `/movie/${hoveredMovie.id}/videos?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
        );
        const trailer = res.data.results.find((vid) => vid.type === "Trailer");
        setTrailerKey(trailer ? trailer.key : "");
      } catch (err) {
        console.error("Trailer fetch error:", err);
      }
    };

    fetchTrailer();
  }, [hoveredMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (movie) => {
    navigate(`/movie/${movie.id}`);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="search-wrapper">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((movie) => (
            <li
              key={movie.id}
              onClick={() => handleSuggestionClick(movie)}
              onMouseEnter={() => setHoveredMovie(movie)}
              onMouseLeave={() => {
                setHoveredMovie(null);
                setTrailerKey("");
              }}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <span className="no-img">🎬</span>
              )}
              <span>{movie.title}</span>
            </li>
          ))}
        </ul>
      )}

      {/* ✅ Trailer Preview */}
      {trailerKey && hoveredMovie && (
        <div className="trailer-preview">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerKey}`}
            playing
            muted
            width="320px"
            height="180px"
          />
          <p>{hoveredMovie.title} – Trailer</p>
        </div>
      )}
    </div>
  );
}
