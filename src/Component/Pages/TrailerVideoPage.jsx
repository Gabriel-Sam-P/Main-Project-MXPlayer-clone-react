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
    console.error("Error fetching trailer:", err);
    return null;
  }
}

const TrailerVideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrailer = async () => {
      const key = await fetchTMDBTrailer(id);
      setVideoKey(key);
      setLoading(false);
    };
    loadTrailer();
  }, [id]);

  // ✅ Loading screen
  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: "#000",
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  // ✅ No trailer found
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
          sx={{
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
          }}
        >
          No trailer available for this movie.
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

  // ✅ Full-screen video player
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
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

      {/* Full-screen responsive iframe */}
      <Box
        component="iframe"
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
        title="Movie Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          border: "none",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default TrailerVideoPage;
