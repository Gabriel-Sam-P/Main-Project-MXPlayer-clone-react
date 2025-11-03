import React, { useEffect } from "react";
import HeaderPage from "./Pages/HeaderPage";
import  MediaPage from "./Pages/MediaPage";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: "black" }}>
      <HeaderPage />
      < MediaPage/>
    </div>
  );
};

export default HomePage;
