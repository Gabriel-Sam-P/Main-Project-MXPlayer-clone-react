import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  FaPlay,
  FaInfoCircle,
  FaPlus,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Fetch slides from API
  useEffect(() => {
    axios
      .get("http://localhost:3001/Slider")
      .then((res) => setSlides(res.data))
      .catch((err) => console.error("Error fetching slider:", err));
  }, []);

  // Auto-slide every 10 seconds
  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [slides]);

  if (slides.length === 0) {
    return <Typography sx={{ color: "white" }}>Loading...</Typography>;
  }

  const currentSlide = slides[currentIndex];

  return (
    <Box position="relative" width="100%" height="90vh" overflow="hidden">
      {/* Background Video */}
      <video
        key={currentSlide.id}
        src={currentSlide.video}
        autoPlay
        loop
        muted={muted}
        playsInline
        preload="auto"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.2) 80%)",
        }}
      />

      {/* Content */}
      <Grid
        container
        spacing={2}
        sx={{
          position: "absolute",
          bottom: { xs: "15%", md: "20%" },
          left: "5%",
          color: "white",
          zIndex: 2,
          maxWidth: "90%",
        }}
      >
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3.5rem" },
            }}
          >
            {currentSlide.title}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
              mt: 1,
              maxWidth: "700px",
            }}
          >
            {currentSlide.description}
          </Typography>

          {/* Buttons */}
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm="auto">
              <Button
                variant="contained"
                startIcon={<FaPlay />}
                sx={{
                  bgcolor: "#007bff",
                  "&:hover": { bgcolor: "#0056b3" },
                  px: { xs: 2, md: 3 },
                  py: { xs: 1, md: 1.5 },
                  borderRadius: "6px",
                  textTransform: "none",
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Play
              </Button>
            </Grid>

            <Grid item xs={12} sm="auto">
              <Button
                variant="contained"
                startIcon={<FaInfoCircle />}
                sx={{
                  bgcolor: "rgba(109, 109, 110, 0.7)",
                  "&:hover": { bgcolor: "rgba(109, 109, 110, 0.9)" },
                  px: { xs: 2, md: 3 },
                  py: { xs: 1, md: 1.5 },
                  borderRadius: "6px",
                  textTransform: "none",
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                More Info
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              sm="auto"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Button
                variant="contained"
                startIcon={<FaPlus />}
                sx={{
                  bgcolor: "rgba(109, 109, 110, 0.7)",
                  "&:hover": { bgcolor: "rgba(109, 109, 110, 0.9)" },
                  px: { xs: 2, md: 3 },
                  py: { xs: 1, md: 1.5 },
                  borderRadius: "6px",
                  textTransform: "none",
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Add to My List
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Navigation Arrows (hidden on tablets) */}
      {!isMobile && !isTablet && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            px: 2,
            transform: "translateY(-50%)",
            zIndex: 2,
          }}
        >
          <IconButton
            onClick={() =>
              setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
            }
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              borderRadius: "8px",
              "&:hover": { bgcolor: "rgba(255,255,255,0.4)" },
              width: 48,
              height: 48,
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <IconButton
            onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              borderRadius: "8px",
              "&:hover": { bgcolor: "rgba(255,255,255,0.4)" },
              width: 48,
              height: 48,
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      )}

      {/* Mute / Unmute */}
      <IconButton
        onClick={() => setMuted(!muted)}
        sx={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          bgcolor: "#007bff",
          color: "white",
          "&:hover": { bgcolor: "#0056b3" },
          zIndex: 3,
        }}
      >
        {muted ? <FaVolumeMute /> : <FaVolumeUp />}
      </IconButton>

      {/* Dots Indicator (clickable) */}
      <Box
        sx={{
          position: "absolute",
          bottom: "25px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
          zIndex: 3,
        }}
      >
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => setCurrentIndex(i)}
            sx={{
              width: i === currentIndex ? "12px" : "8px",
              height: i === currentIndex ? "12px" : "8px",
              borderRadius: "50%",
              bgcolor: i === currentIndex ? "white" : "gray",
              transition: "0.3s",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroSlider;


