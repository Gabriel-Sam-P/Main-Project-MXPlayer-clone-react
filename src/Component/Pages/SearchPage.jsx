import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const FALLBACK_POSTER = "https://via.placeholder.com/200x300?text=No+Image";
const TMDB_API_KEY = "ce759924c0c73922a3e4cf611fbbc05c";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const MediaSlider = ({ title, items, type }) => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const navigate = useNavigate();

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  return (
    <Box sx={{ position: "relative", mx: 3, mb: 5 }}>
      <Typography variant="h5" fontWeight="bold" color="white" mb={3}>
        {title}
      </Typography>

      {showLeft && (
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "rgba(0,0,0,0.5)",
          }}
        >
          <ArrowBackIosIcon sx={{ color: "white" }} />
        </IconButton>
      )}

      {showRight && (
        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "rgba(0,0,0,0.5)",
          }}
        >
          <ArrowForwardIosIcon sx={{ color: "white" }} />
        </IconButton>
      )}

      <Box
        ref={scrollRef}
        onScroll={checkScrollPosition}
        sx={{
          display: "flex",
          overflowX: "auto",
          "&::-webkit-scrollbar": { display: "none" },
          padding: "10px 0",
        }}
      >
        {items.map((item) => {
          const titleText = type === "movie" ? item.title : item.name;
          const dateText =
            type === "movie"
              ? item.release_date?.split("-")[0]
              : item.first_air_date?.split("-")[0];

          return (
            <Card
              key={item.id}
              sx={{
                width: 180,
                height: 300,
                bgcolor: "#222",
                borderRadius: 2,
                boxShadow: 4,
                mr: 2,
                flex: "0 0 auto",
                cursor: "pointer",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
              onClick={() => navigate(`/trailer/${type}/${item.id}`)}
            >
              <CardMedia
                component="img"
                height="240"
                image={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : FALLBACK_POSTER
                }
                alt={titleText}
                sx={{
                  borderRadius: "8px 8px 0 0",
                  objectFit: "cover",
                  backgroundColor: "#333",
                }}
              />
              <CardContent sx={{ height: 60, p: "4px 8px" }}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{
                    color: "white",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {titleText}
                </Typography>
                <Typography variant="body2" color="white">
                  {dateText}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

// 🔹 Main Search Page
const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  // 🔍 Function to perform search (triggered by icon click)
  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      // 🔸 If a category is selected, search only that type
      if (category) {
        const res = await fetch(
          `${TMDB_BASE_URL}/search/${category}?api_key=${TMDB_API_KEY}&language=en-US&query=${query}`
        );
        const data = await res.json();
        if (category === "movie") {
          setMovieResults(data.results || []);
          setTvResults([]);
        } else {
          setTvResults(data.results || []);
          setMovieResults([]);
        }
      } else {
        // 🔸 If no category, search both movies and TV
        const [movieRes, tvRes] = await Promise.all([
          fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}`),
          fetch(`${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&language=en-US&query=${query}`),
        ]);
        const movieData = await movieRes.json();
        const tvData = await tvRes.json();
        setMovieResults(movieData.results || []);
        setTvResults(tvData.results || []);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // 🎬 Fetch default category list
  const fetchCategoryResults = async (type) => {
    setCategory(type);
    setQuery("");
    setMovieResults([]);
    setTvResults([]);

    try {
      const res = await fetch(
        `${TMDB_BASE_URL}/discover/${type}?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();

      if (type === "movie") {
        setMovieResults(data.results || []);
      } else {
        setTvResults(data.results || []);
      }
    } catch (error) {
      console.error("Error fetching category results:", error);
    }
  };

  return (
    <Box sx={{ bgcolor: "#000", color: "#fff", minHeight: "100vh", p: 3, pt: 10, position: "relative" }}>
      {/* ❌ Close Button */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          bgcolor: "rgba(255,255,255,0.1)",
          "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
        }}
      >
        <CloseIcon sx={{ color: "white", fontSize: 28 }} />
      </IconButton>

      {/* 🔍 Search Input */}
      <Box sx={{ maxWidth: 700, mx: "auto", mb: 4 }}>
        <TextField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            category === "movie"
              ? "Search Movies..."
              : category === "tv"
              ? "Search TV Shows..."
              : "Search Movies or TV Shows..."
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleSearch}>
                  <SearchIcon sx={{ color: "#999" }} />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: "30px",
              backgroundColor: "#111",
              color: "#fff",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#333" },
            },
          }}
          variant="outlined"
        />
      </Box>

      {/* 🔹 Filter Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 4 }}>
        <Button
          variant="contained"
          sx={{
            background:
              category === "movie"
                ? "linear-gradient(90deg, #00b4ff, #007bff)"
                : "linear-gradient(90deg, #007bff, #0062cc)",
            color: "#fff",
            fontWeight: "bold",
            px: 4,
            py: 1.2,
            borderRadius: 2,
            textTransform: "uppercase",
          }}
          onClick={() => fetchCategoryResults("movie")}
        >
          Movies
        </Button>
        <Button
          variant="contained"
          sx={{
            background:
              category === "tv"
                ? "linear-gradient(90deg, #a36bff, #6610f2)"
                : "linear-gradient(90deg, #6610f2, #6f42c1)",
            color: "#fff",
            fontWeight: "bold",
            px: 4,
            py: 1.2,
            borderRadius: 2,
            textTransform: "uppercase",
          }}
          onClick={() => fetchCategoryResults("tv")}
        >
          TV Shows
        </Button>
      </Box>

      {/* 🔹 Results */}
      {movieResults.length > 0 && (
        <MediaSlider title="Movies" items={movieResults} type="movie" />
      )}
      {tvResults.length > 0 && (
        <MediaSlider title="TV Shows" items={tvResults} type="tv" />
      )}
      {!movieResults.length && !tvResults.length && (
        <Typography textAlign="center" color="#aaa">
          No results found
        </Typography>
      )}
    </Box>
  );
};

export default SearchPage;
