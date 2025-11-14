import "./App.css";
import Navbar from "./Component/Navbar";
import HomePage from "./Component/HomePage";
import ViewAllPage from "./Component/Pages/ViewAllPage";
import Latest2025Page from "./Component/Pages/Latest2025Page";
import SearchPage from "./Component/Pages/SearchPage";
import MxGoldPage from "./Component/Pages/MxGoldPage";
import TrailerVideoPage from "./Component/Pages/TrailerVideoPage";
import Footer from "./Component/Footer";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";


// 🔹 Layout Wrapper to handle conditional Navbar/Footer
function Layout() {
  const location = useLocation();
  const hideLayout = location.pathname === "/search"; // Hide on search page

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/latest-2025" element={<Latest2025Page />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/mx-gold" element={<MxGoldPage />} />
        
        <Route path="/trailer/:type/:id" element={<TrailerVideoPage />} />
        <Route path="/view-all/:type/:genre" element={<ViewAllPage />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
