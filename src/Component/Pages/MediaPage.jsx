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
import { useNavigate } from "react-router-dom";

const FALLBACK_POSTER = "https://via.placeholder.com/200x300?text=No+Image";
const TMDB_API_KEY = "ce759924c0c73922a3e4cf611fbbc05c";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const MOVIE_GENRES = {
  Action: 28,
  Adventure: 12,
  Comedy: 35,
  Horror: 27,
};

const TV_GENRES = {
  Action: 10759,
  Comedy: 35,
  Drama: 18,
};

// 🔹 Fetch trailer (movie or tv)
async function fetchTMDBTrailer(id, type) {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/${type}/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
    );
    const data = await res.json();
    const trailer = data.results?.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    return trailer ? trailer.key : null;
  } catch (err) {
    console.error("TMDB API error fetching trailer:", err);
    return null;
  }
}

// 🔹 Generic Slider
const MediaSlider = ({ title, items, type, onViewAll }) => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [activeTrailer, setActiveTrailer] = useState(null);
  const [trailerIds, setTrailerIds] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  // Filter valid items
  useEffect(() => {
    const validItems = items.filter((item) =>
      type === "movie"
        ? item.poster_path && item.title && item.release_date
        : item.poster_path && item.name && item.first_air_date
    );
    setFilteredItems(validItems);
    checkScrollPosition();
  }, [items, type]);

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

  // ▶️ Auto-play trailer
  const handleMouseEnter = async (item) => {
    if (!trailerIds[item.id]) {
      const id = await fetchTMDBTrailer(item.id, type);
      if (!id) {
        setFilteredItems((prev) => prev.filter((i) => i.id !== item.id));
        return;
      }
      setTrailerIds((prev) => ({ ...prev, [item.id]: id }));
    }
    setActiveTrailer(item.id);
  };

  // ⏹ Stop trailer
  const handleMouseLeave = (itemId) => {
    setActiveTrailer(null);
    const iframe = document.getElementById(`trailer-${type}-${itemId}`);
    if (iframe) {
      // Recreate iframe node instead of reassigning src
      const newIframe = iframe.cloneNode(true);
      iframe.parentNode.replaceChild(newIframe, iframe);
    }
  };

  return (
    <Box sx={{ position: "relative", mx: 3, mb: 5 }}>
      {/* Title + View All */}
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

      {/* Media Cards */}
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
        {filteredItems.map((item) => {
          const isActive = activeTrailer === item.id;
          const videoId = trailerIds[item.id];
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
                perspective: "1000px",
                cursor: "pointer",
                transformStyle: "preserve-3d",
                transition: "transform 0.8s ease",
              }}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={() => handleMouseLeave(item.id)}
              onClick={() => navigate(`/trailer/${type}/${item.id}`)}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.8s ease",
                  transform: isActive ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front */}
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
                      {titleText}
                    </Typography>
                    <Typography variant="body2" color="white">
                      {dateText}
                    </Typography>
                  </CardContent>
                </Box>

                {/* Back (Trailer) */}
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
                      id={`trailer-${type}-${item.id}`}
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1&controls=0&showinfo=0&modestbranding=1`}
                      title={`${titleText} Trailer`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ borderRadius: "8px" }}
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

// 🔹 Main Media Page
const MediaPage = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [tvByGenre, setTvByGenre] = useState({});

  useEffect(() => {
    const fetchByGenre = async (genreId, type) => {
      const endpoint =
        type === "movie"
          ? `${TMDB_BASE_URL}/discover/movie`
          : `${TMDB_BASE_URL}/discover/tv`;
      try {
        const res = await fetch(
          `${endpoint}?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=en-US&page=1`
        );
        const data = await res.json();
        return data?.results || [];
      } catch (err) {
        console.error(`Failed to fetch ${type} by genre:`, err);
        return [];
      }
    };

    const loadMedia = async () => {
      const movieResults = {};
      const tvResults = {};

      for (const [name, id] of Object.entries(MOVIE_GENRES)) {
        movieResults[name] = await fetchByGenre(id, "movie");
      }
      for (const [name, id] of Object.entries(TV_GENRES)) {
        tvResults[name] = await fetchByGenre(id, "tv");
      }

      setMoviesByGenre(movieResults);
      setTvByGenre(tvResults);
    };

    loadMedia();
  }, []);

   const navigate = useNavigate();

  const handleViewAll = (genre, type) => {
    navigate(`/view-all/${type}/${genre}`);
  };
   

  return (
    <Box sx={{ bgcolor: "#111", minHeight: "100vh", pb: 4 }}>
      {Object.entries(moviesByGenre).map(([genreName, items]) => (
        <Box key={genreName} id={`${genreName}-movies`} sx={{ scrollMarginTop: "100px" }}>
          <MediaSlider
            title={`${genreName} Movies`}
            items={items.slice(0, 15)}
            type="movie"
            onViewAll={() => handleViewAll(genreName, "movie")}
          />
        </Box>
      ))}

      {Object.entries(tvByGenre).map(([genreName, items]) => (
        <Box key={genreName} id={`${genreName}-tv`} sx={{ scrollMarginTop: "100px" }}>
          <MediaSlider
            title={`${genreName} TV Shows`}
            items={items.slice(0, 15)}
            type="tv"
            onViewAll={() => handleViewAll(genreName, "tv")}
          />
        </Box>
      ))}
    </Box>
  );
};

export default MediaPage;
