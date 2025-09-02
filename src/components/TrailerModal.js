import React, { useEffect, useState } from "react";
import axios from "../Api";
import ReactPlayer from "react-player";
import "./TrailerModal.css";

export default function TrailerModal({ movieId, onClose }) {
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    async function fetchTrailer() {
      try {
        const res = await axios.get(
          `/movie/${movieId}/videos?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
        );
        const trailer = res.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer ? trailer.key : "");
      } catch (err) {
        console.error("Error fetching trailer:", err);
      }
    }
    fetchTrailer();
  }, [movieId]);

  return (
    <div className="trailer-modal">
      <div className="trailer-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        {trailerKey ? (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerKey}`}
            controls
            playing
            width="100%"
            height="500px"
          />
        ) : (
          <p style={{ color: "white" }}>No trailer available.</p>
        )}
      </div>
    </div>
  );
}
