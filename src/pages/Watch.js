import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../Api";
import ReactPlayer from "react-player";
import "./Watch.css";

export default function Watch() {
  const { id } = useParams();
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    async function fetchTrailer() {
      try {
        const res = await axios.get(
          `/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
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
  }, [id]);

  return (
    <div className="watch-page">
      {trailerKey ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
          playing
          controls
          width="100%"
          height="100vh"
        />
      ) : (
        <p style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
          No video available for this movie.
        </p>
      )}

      {/* Back button */}
      <Link to="/" className="back-btn">⬅ Back to Home</Link>
    </div>
  );
}
