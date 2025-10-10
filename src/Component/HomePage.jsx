import React from "react";
import Navbar from './Navbar';
import HeaderPage from "./Pages/HeaderPage";
import MovieList from "./Pages/MovieList";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div style={{backgroundcolor:'black'}}>
      <Navbar />
      <HeaderPage />
      <MovieList />
      <Footer />
    </div>
  );
};

export default HomePage;
