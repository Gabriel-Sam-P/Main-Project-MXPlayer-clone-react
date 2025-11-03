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

const TMDB_API_KEY = "ce759924c0c73922a3e4cf611fbbc05c";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const FALLBACK_POSTER = "https://via.placeholder.com/200x300?text=No+Image";

// 🔹 Fetch trailer for given movie or TV show
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

// 🔹 Generic slider component (same as MediaPage)
const MediaSlider = ({ title, items, type, onViewAll }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [activeTrailer, setActiveTrailer] = useState(null);
  const [trailerIds, setTrailerIds] = useState({});

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  const scroll = (dir) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const newScroll =
        dir === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const handleMouseEnter = async (item) => {
    if (!trailerIds[item.id]) {
      const id = await fetchTMDBTrailer(item.id, type);
      if (!id) return; // ❌ no trailer, skip activation
      setTrailerIds((prev) => ({ ...prev, [item.id]: id }));
    }
    setActiveTrailer(item.id);
  };

  const handleMouseLeave = (itemId) => {
    setActiveTrailer(null);
    const iframe = document.getElementById(`trailer-${type}-${itemId}`);
    if (iframe) {
      const newIframe = iframe.cloneNode(true);
      iframe.parentNode.replaceChild(newIframe, iframe);
    }
  };

  return (
    <Box sx={{ position: "relative", mx: 3, mb: 5 }}>
      {/* Title + optional "View All" */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 6 }}>
        <Typography variant="h5" fontWeight="bold" color="white">
          {title}
        </Typography>
        {onViewAll && (
          <Box
            onClick={onViewAll}
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 1,
              cursor: "pointer",
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
                transition: "all 0.3s ease",
              }}
            >
              View All
            </Typography>
          </Box>
        )}
      </Box>

      {/* Arrows */}
      {showLeft && (
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "rgba(0,0,0,0.5)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
            zIndex: 10,
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
            bgcolor: "rgba(0,0,0,0.5)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
            zIndex: 10,
          }}
        >
          <ArrowForwardIosIcon sx={{ color: "white" }} />
        </IconButton>
      )}

      {/* Cards */}
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
        {items.map((item) => {
          // 🔹 Skip if item has no poster and no trailer
          if (!item.poster_path && !trailerIds[item.id]) return null;

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

// 🔹 Main Page for Latest 2025
const Latest2025Page = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [latestTvShows, setLatestTvShows] = useState([]);

  useEffect(() => {
    const fetchLatest = async (type) => {
      const endpoint =
        type === "movie"
          ? `${TMDB_BASE_URL}/discover/movie`
          : `${TMDB_BASE_URL}/discover/tv`;
      try {
        const res = await fetch(
          `${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&sort_by=release_date.desc&year=2025&page=1`
        );
        const data = await res.json();
        // Only keep items with a poster path
        return (data.results || []).filter((i) => i.poster_path);
      } catch (err) {
        console.error(`Failed to fetch ${type}:`, err);
        return [];
      }
    };

    const loadData = async () => {
      const [movies, shows] = await Promise.all([
        fetchLatest("movie"),
        fetchLatest("tv"),
      ]);
      setLatestMovies(movies);
      setLatestTvShows(shows);
    };

    loadData();
  }, []);

  return (
    <Box sx={{ bgcolor: "#111", minHeight: "100vh", pb: 4, pt: 10 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#1e90ff",
          fontWeight: 700,
          mb: 5,
          textShadow: "0 0 8px rgba(30,144,255,0.3)",
        }}
      >
        🔥 New in 2025
      </Typography>

      <MediaSlider title="Latest Movies (2025)" items={latestMovies} type="movie" />
      <MediaSlider title="Latest TV Shows (2025)" items={latestTvShows} type="tv" />
    </Box>
  );
};

export default Latest2025Page;
