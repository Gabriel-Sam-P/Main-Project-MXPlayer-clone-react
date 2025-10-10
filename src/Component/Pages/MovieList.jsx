import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom"; // ⬅️ Import navigation

const FALLBACK_POSTER = "https://via.placeholder.com/200x300?text=No+Image";
const TMDB_API_KEY = "ce759924c0c73922a3e4cf611fbbc05c";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// 🔹 Fetch trailer key from TMDB
async function fetchTMDBTrailer(movieId) {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`
    );
    const data = await res.json();
    const trailer = data.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    return trailer ? trailer.key : null;
  } catch (err) {
    console.error("TMDB API error fetching trailer:", err);
    return null;
  }
}

// 🔹 Static genres
const GENRES = {
  Action: 28,
  Adventure: 12,
  Comedy: 35,
  Horror: 27,
};

// 🔹 MovieSlider component
const MovieSlider = ({ title, movies, onViewAll }) => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [activeTrailer, setActiveTrailer] = useState(null);
  const [trailerIds, setTrailerIds] = useState({});
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const navigate = useNavigate(); // ⬅️ Hook for navigation

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollPosition();
  }, [movies]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  // ✅ Play trailer immediately on hover
  const handleMouseEnter = async (movie) => {
    if (!trailerIds[movie.id]) {
      const id = await fetchTMDBTrailer(movie.id);

      // 🔸 Remove card if no trailer found
      if (!id) {
        setFilteredMovies((prev) => prev.filter((m) => m.id !== movie.id));
        return;
      }

      setTrailerIds((prev) => ({ ...prev, [movie.id]: id }));
    }

    setActiveTrailer(movie.id);
  };

  // ✅ Pause trailer instantly on mouse leave
  const handleMouseLeave = (movieId) => {
    setActiveTrailer(null);
    const iframe = document.getElementById(`trailer-${movieId}`);
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        "*"
      );
    }
  };

  return (
    <Box sx={{ position: "relative", mx: 3, mb: 5 }}>
      {/* Title + ViewAll */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 6 }}>
        <Typography variant="h5" fontWeight="bold" color="white">
          {title}
        </Typography>
        <Box
          onClick={onViewAll}
          sx={{
            display: "flex",
            alignItems: "center",
            ml: 1,
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover .viewAllText": {
              opacity: 1,
              width: "auto",
              ml: 1,
              color: "blue",
            },
            "&:hover .viewAllIcon": {
              color: "blue",
            },
          }}
        >
          <ArrowForwardIcon
            className="viewAllIcon"
            sx={{ color: "white", transition: "color 0.3s ease" }}
          />
          <Typography
            className="viewAllText"
            sx={{
              color: "white",
              fontSize: "0.9rem",
              fontWeight: "bold",
              opacity: 0,
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: 0,
              transition: "all 0.3s ease, color 0.3s ease",
            }}
          >
            View All
          </Typography>
        </Box>
      </Box>

      {/* Scroll Buttons */}
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
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
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
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ArrowForwardIosIcon sx={{ color: "white" }} />
        </IconButton>
      )}

      {/* Movie Cards */}
      <Box
        ref={scrollRef}
        onScroll={checkScrollPosition}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" },
          padding: "10px 0",
        }}
      >
        {filteredMovies.map((movie) => {
          const isActive = activeTrailer === movie.id;
          const videoId = trailerIds[movie.id];

          return (
            <Card
              key={movie.id}
              sx={{
                width: 180,
                height: 300,
                bgcolor: "#222",
                borderRadius: 2,
                boxShadow: 4,
                mr: 2,
                flex: "0 0 auto",
                perspective: "1000px",
                cursor: "pointer",
              }}
              onMouseEnter={() => handleMouseEnter(movie)}
              onMouseLeave={() => handleMouseLeave(movie.id)}
              onClick={() => navigate(`/trailer/${movie.id}`)} // ⬅️ Click to go fullscreen trailer
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.8s",
                  transform: isActive ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front: Poster */}
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : FALLBACK_POSTER
                    }
                    alt={movie.title}
                    sx={{
                      borderRadius: "8px 8px 0 0",
                      objectFit: "cover",
                      backgroundColor: "#333",
                    }}
                  />
                  <CardContent sx={{ height: 60, padding: "4px 8px" }}>
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
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" color="white">
                      {movie.release_date?.split("-")[0]}
                    </Typography>
                  </CardContent>
                </Box>

                {/* Back: YouTube Trailer */}
                {videoId && (
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <iframe
                      id={`trailer-${movie.id}`}
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1`}
                      title="Trailer"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </Box>
                )}
              </Box>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

// 🔹 Main MoviesPage component
const MoviesPage = () => {
  const [genreMovies, setGenreMovies] = useState({});

  useEffect(() => {
    const fetchMoviesByGenre = async (genreId) => {
      try {
        const res = await fetch(
          `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=en-US&page=1`
        );
        const data = await res.json();
        return data?.results || [];
      } catch (err) {
        console.error("Failed to fetch genre movies:", err);
        return [];
      }
    };

    const loadAllGenres = async () => {
      let all = {};
      for (const [name, id] of Object.entries(GENRES)) {
        all[name] = await fetchMoviesByGenre(id);
      }
      setGenreMovies(all);
    };

    loadAllGenres();
  }, []);

  const handleViewAll = (category) => {
    alert(`View all ${category} movies`);
  };

  return (
    <Box sx={{ bgcolor: "#111", minHeight: "100vh", pb: 4 }}>
      {Object.entries(genreMovies).map(([genreName, movies]) => (
        <MovieSlider
          key={genreName}
          title={`${genreName} Movies`}
          movies={movies.slice(0, 15)}
          onViewAll={() => handleViewAll(genreName)}
        />
      ))}
    </Box>
  );
};

export default MoviesPage;
