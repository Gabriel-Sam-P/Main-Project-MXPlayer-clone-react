import React, { useState, useRef } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Fade,
  Switch,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AddIcon from "@mui/icons-material/Add";
import TranslateIcon from "@mui/icons-material/Translate";
import HistoryIcon from "@mui/icons-material/History";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CastIcon from "@mui/icons-material/Cast";
import DownloadIcon from "@mui/icons-material/Download";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Logo from "../Assest/Mx.jpg";

const TMDB_API_KEY = "ce759924c0c73922a3e4cf611fbbc05c";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const navigate = useNavigate();

  const navLinks = ["Movies", "TvShows", "New In 2025", "Trailers"];

  const menuItems = {
    TvShows: ["Action Shows", "Comedy Shows", "Drama Shows"],
    Movies: ["Action", "Adventure", "Comedy", "Horror"],
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("");
  const isMenuOpen = Boolean(anchorEl);
  const closeTimer = useRef(null);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isDropdownOpen = Boolean(menuAnchorEl);

  const [kidsMode, setKidsMode] = useState(false);

  // 🔹 Scroll to homepage sections
  const scrollToSection = (item) => {
    const mapping = {
      Action: "Action-movies",
      Adventure: "Adventure-movies",
      Comedy: "Comedy-movies",
      Horror: "Horror-movies",
      "Action Shows": "Action-tv",
      "Comedy Shows": "Comedy-tv",
      "Drama Shows": "Drama-tv",
    };

    const targetId = mapping[item];
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/"); // fallback
    }
  };

  // 🔹 Menu hover logic
  const handleMenuOpen = (event, menuLabel) => {
    if (menuItems[menuLabel]) {
      clearTimeout(closeTimer.current);
      setAnchorEl(event.currentTarget);
      setSelectedMenu(menuLabel);
    } else {
      setAnchorEl(null);
      setSelectedMenu("");
    }
  };

  const handleMenuClose = () => {
    closeTimer.current = setTimeout(() => {
      setAnchorEl(null);
      setSelectedMenu("");
    }, 150);
  };

  const handleDropdownOpen = (event) => setMenuAnchorEl(event.currentTarget);
  const handleDropdownClose = () => setMenuAnchorEl(null);

  const dropdownItemsTop = [
    { icon: <AddIcon />, text: "My List" },
    { icon: <TranslateIcon />, text: "Language Preferences" },
    { icon: <HistoryIcon />, text: "Watch History" },
  ];

  const dropdownItemsBottom = [
    { icon: <CastIcon />, text: "Activate TV" },
    { icon: <DownloadIcon />, text: "Download App" },
    { icon: <HelpOutlineIcon />, text: "Help Center" },
  ];

  // 🔹 Handle Navbar link clicks
  const handleNavClick = (e, label) => {
    if (label === "New In 2025") {
      navigate("/latest-2025");
    } else if (label === "Trailers") {
      // 🔹 Fetch random trailer (movie or tv)
      const types = ["movie", "tv"];
      const randomType = types[Math.floor(Math.random() * types.length)];

      fetch(
        `https://api.themoviedb.org/3/${randomType}/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      )
        .then((res) => res.json())
        .then((data) => {
          const items = data.results || [];
          if (!items.length) return;

          const randomItem = items[Math.floor(Math.random() * items.length)];
          navigate(`/trailer/${randomType}/${randomItem.id}`, {
            state: { item: randomItem, type: randomType },
          });
        })
        .catch((err) => console.error("Error fetching random trailer:", err));
    } else if (menuItems[label]) {
      handleMenuOpen(e, label);
    } else {
      navigate("/");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "black",
          px: 2,
          zIndex: 1000,
        }}
      >
        <Toolbar>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            {/* Logo */}
            <Grid item>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1.5,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                <img
                  src={Logo}
                  alt="MX Player Logo"
                  style={{ height: "35px" }}
                />
              </Box>
            </Grid>

            {/* Nav Links */}
            {!isMobile && (
              <Grid
                sx={{
                  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                {navLinks.map((label) => (
                  <Typography
                    key={label}
                    onMouseEnter={
                      isDesktop && menuItems[label]
                        ? (e) => handleMenuOpen(e, label)
                        : undefined
                    }
                    onClick={(e) => handleNavClick(e, label)}
                    sx={{
                      cursor: "pointer",
                      color:
                        selectedMenu === label && isMenuOpen
                          ? "#1e90ff"
                          : "white",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      transition: "color 0.3s",
                      "&:hover": { color: "#1e90ff" },
                      paddingBottom: "4px",
                      borderBottom:
                        selectedMenu === label && isMenuOpen
                          ? "2px solid #1e90ff"
                          : "2px solid transparent",
                    }}
                  >
                    {label}
                  </Typography>
                ))}
              </Grid>
            )}

            {/* Right side */}
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 2, md: 3},
              }}
            >
              <IconButton sx={{ color: "white"}} onClick={() => navigate("/search")}>
                <SearchIcon />
              </IconButton>

              {!isMobile && (
                  <Button
                    variant="outlined"
                    startIcon={<PlayCircleIcon />}
                    sx={{
                      color: "#fff",
                      borderColor: "#d4af37",
                      backgroundColor: "#2b2100",
                      "&:hover": {
                        borderColor: "#ffd700",
                        backgroundColor: "#3a2e00",
                      },
                      fontSize: "0.75rem",
                      textTransform: "none",
                      borderRadius: "20px",
                      px: 1,
                    }}
                    onClick={() => navigate("/mx-gold")}
                  >
                    <Typography variant="secondary" sx={{ textAlign: "center", p: 0.3 }}>
                      UPGRADE TO MX GOLD
                    </Typography>
                  </Button>

              )}

              {!isMobile && (
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "0.95rem",
                  }}
                >
                  Login
                </Typography>
              )}

              <IconButton sx={{ color: "white" }} onClick={handleDropdownOpen}>
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* Dropdown submenu for Movies/TV */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 200 }}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(17, 24, 33, 0.9)",
            color: "white",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",
            minWidth: "180px",
            backdropFilter: "blur(6px)",
            borderRadius: 1,
            py: 0.5,
          },
          onMouseEnter: isDesktop
            ? () => clearTimeout(closeTimer.current)
            : undefined,
          onMouseLeave: isDesktop ? handleMenuClose : undefined,
        }}
        sx={{ mt: isDesktop ? 1.5 : 0.5 }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {menuItems[selectedMenu]?.map((item) => (
          <MenuItem
            key={item}
            onClick={() => {
              handleMenuClose();
              scrollToSection(item);
            }}
            sx={{
              "&:hover": {
                color: "#1e90ff",
                backgroundColor: "transparent",
              },
              py: 1,
              px: 2,
              transition: "all 0.2s ease",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: "0.9rem" }}
            >
              {item}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

      {/* Menu icon dropdown */}
      <Menu
        anchorEl={menuAnchorEl}
        open={isDropdownOpen}
        onClose={handleDropdownClose}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(17, 24, 33, 0.95)",
            color: "white",
            width: 350,
            borderRadius: 2,
            py: 1,
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {dropdownItemsTop.map((item) => (
          <MenuItem
            key={item.text}
            onClick={handleDropdownClose}
            sx={{ "&:hover": { color: "#1e90ff" } }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 32 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}

        {/* Kids Mode */}
        <MenuItem
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            py: 1.5,
            px: 2,
            "&:hover .hover-color": { color: "#1e90ff" },
          }}
        >
          <Box
            className="hover-color"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              color: kidsMode ? "gold" : "white",
              transition: "color 0.2s ease",
            }}
          >
            <EmojiEmotionsIcon />
            <Box sx={{ lineHeight: 1.2 }}>
              <Typography variant="body1" fontWeight={500}>
                Kids Mode
              </Typography>
              <Typography variant="caption">
                Enable content for users under 13 by turning it on.
              </Typography>
            </Box>
          </Box>
          <Switch
            checked={kidsMode}
            onChange={() => setKidsMode(!kidsMode)}
            size="small"
          />
        </MenuItem>

        <Divider sx={{ backgroundColor: "#333", my: 1 }} />

        {dropdownItemsBottom.map((item) => (
          <MenuItem
            key={item.text}
            onClick={handleDropdownClose}
            sx={{ "&:hover": { color: "#1e90ff" } }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 32 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Navbar;
