import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SearchResults from "./pages/SearchResults";  // ✅ new page
import Navbar from "./components/Navbar";
import Watch from "./pages/Watch";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/movie/:id" element={<MovieDetails />} />
  <Route path="/search/:query" element={<SearchResults />} />
  <Route path="/watch/:id" element={<Watch />} />   {/* ✅ New Watch Page */}
</Routes>


function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search/:query" element={<SearchResults />} />  {/* ✅ */}
      </Routes>
    </div>
  );
}

export default App;
