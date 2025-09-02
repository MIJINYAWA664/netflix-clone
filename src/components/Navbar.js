import React from "react";
import SearchBar from "./SearchBar";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Netflix Clone</h2>
      <SearchBar />
    </nav>
  );
}
