import React, { useEffect, useState } from "react";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const TMDB_API_KEY = "ce759924c0c73922a3e4cf611fbbc05c";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const FALLBACK_POSTER = "https://via.placeholder.com/200x300?text=No+Image";

const GENRE_IDS = {
  movie: {
    Action: 28,
    Adventure: 12,
    Comedy: 35,
    Horror: 27,
  },
  tv: {
    Action: 10759,
    Comedy: 35,
    Drama: 18,
  },
};

const ViewAllPage = () => {
  const { type, genre } = useParams();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []); 

    
  useEffect(() => {
    const fetchItems = async () => {
      const genreId = GENRE_IDS[type]?.[genre];
      if (!genreId) return;

      const endpoint =
        type === "movie"
          ? `${TMDB_BASE_URL}/discover/movie`
          : `${TMDB_BASE_URL}/discover/tv`;

      try {
        const res = await fetch(
          `${endpoint}?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=en-US&page=1`
        );
        const data = await res.json();
        setItems(data.results || []);
      } catch (err) {
        console.error("Error fetching View All data:", err);
      }
    };

    fetchItems();
  }, [type, genre]);

  return (
    <Box sx={{ bgcolor: "#111", minHeight: "100vh", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="white" mb={4}>
        {genre} {type === "movie" ? "Movies" : "TV Shows"}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 3,
        }}
      >
        {items.map((item) => (
          <Card
            key={item.id}
            sx={{
              bgcolor: "#222",
              color: "white",
              borderRadius: 2,
              boxShadow: 4,
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
              alt={type === "movie" ? item.title : item.name}
            />
            <CardContent>
              <Typography
                variant="body1"
                fontWeight="bold"
                noWrap
                sx={{ color: "white" }}
              >
                {type === "movie" ? item.title : item.name}
              </Typography>
              <Typography variant="body2" color="gray">
                {type === "movie"
                  ? item.release_date?.split("-")[0]
                  : item.first_air_date?.split("-")[0]}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ViewAllPage;
