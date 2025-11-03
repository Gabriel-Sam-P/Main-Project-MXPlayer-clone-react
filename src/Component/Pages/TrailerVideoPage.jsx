import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  CircularProgress,
  Typography,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";

const TMDB_API_KEY = "ce759924c0c73922a3e4cf611fbbc05c";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

/* 🔹 Fetch trailer for movie */
async function fetchMovieTrailer(id) {

  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
    );
    const data = await res.json();
    const trailer = data.results?.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    return trailer ? trailer.key : null;
  } catch (err) {
    console.error("Error fetching movie trailer:", err);
    return null;
  }
}

/* 🔹 Fetch trailer for TV show */
async function fetchTVTrailer(id) {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/tv/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
    );
    const data = await res.json();
    const trailer = data.results?.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    return trailer ? trailer.key : null;
  } catch (err) {
    console.error("Error fetching TV trailer:", err);
    return null;
  }
}

const TrailerVideoPage = () => {
  const { id, type } = useParams(); // type = 'movie' or 'tv'
  const navigate = useNavigate();
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(true);

      useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  useEffect(() => {
    const loadTrailer = async () => {
      let key = null;
      if (type === "tv") {
        key = await fetchTVTrailer(id);
      } else {
        key = await fetchMovieTrailer(id);
      }
      setVideoKey(key);
      setLoading(false);
    };
    loadTrailer();
  }, [id, type]);

  // 🔹 Loading State
  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: "#000",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  // 🔹 No Trailer Found
  if (!videoKey) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          mb={2}
          sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" } }}
        >
          No trailer available for this {type === "tv" ? "TV show" : "movie"}.
        </Typography>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            color: "white",
            backgroundColor: "rgba(255,255,255,0.1)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Container>
    );
  }

  // 🔹 Trailer Player (Cinematic layout)
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: "#000",
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: { xs: 10, sm: 16, md: 20 },
          left: { xs: 10, sm: 20 },
          color: "white",
          zIndex: 10,
          backgroundColor: "rgba(0,0,0,0.4)",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Centered YouTube Player */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <Box
          component="iframe"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
          title={`${type === "tv" ? "TV Show" : "Movie"} Trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sx={{
            width: { xs: "95%", sm: "85%", md: "70%" , lg:"85%" },
            aspectRatio: "2.21 / 1", // Cinematic aspect ratio
            border: "none",
            borderRadius: 2,
            boxShadow: "0 0 30px rgba(255,255,255,0.15)",
          }}
        />
      </Box>
    </Box>
  );
};

export default TrailerVideoPage;
