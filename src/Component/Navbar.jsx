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
  Modal,
  TextField,
  Paper,
  InputAdornment,
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
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import Logo from "../Assest/Mx.jpg";
import '@fortawesome/fontawesome-free/css/all.min.css';
import GoogleIconSVG from "../Assest/icon/icons8-google.svg";
import FacebookCircledIcon from "../Assest/icon/icons8-facebook.svg";




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

  // 🔹 Modal login state
  const [openLogin, setOpenLogin] = useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);


  // Inside your Navbar component function
   const [mobile, setMobile] = useState("");
    // validation: true only when 10 digits entered
   const isValid = mobile.length === 10;

  // 🔹 Scroll logic
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
                <img src={Logo} alt="MX Player Logo" style={{ height: "35px" }} />
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
                gap: { xs: 1, sm: 2, md: 3 },
              }}
            >
              <IconButton sx={{ color: "white" }} onClick={() => navigate("/search")}>
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

              {/* 🔹 Login Button opens Modal */}
              {!isMobile && (
                <Button
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    textTransform: "none",
                  }}
                  onClick={handleOpenLogin}
                >
                  Login
                </Button>
              )}

              <IconButton sx={{ color: "white" }} onClick={handleDropdownOpen}>
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* 🔹 Login Modal */}
        <Modal open={openLogin} onClose={handleCloseLogin}>
          <Box
            component={Paper}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "95%", sm: "90%", md: "80%", lg: "85%" },
              backgroundColor: "#0d0f13",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 0 25px rgba(0,0,0,0.5)",
              color: "gray",
            }}
          >
            <Grid container>
              {/* LEFT SIDE */}
              <Grid size= {{xs:12, md:6}} 
                sx={{
                  background:"black",
                  p: { xs: 3, sm: 4, md: 8 },
                  display:{lg:"flex",md:"flex",sm:"none",xs:"none"},
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                  <img
                    src={Logo}
                    alt="Amazon MX Player"
                    style={{ height: 40, marginRight: 10 }}
                  />
                </Box>
    
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Premium OTT service in India, where you can watch original series,
                  TV & Web shows, movies, and trending shows for free.
                </Typography>
    
                <Box sx={{  fontSize: "0.9rem" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <i className="fa-solid fa-desktop" style={{ color:"#0d63ef",marginRight: 10}}></i>
                    Watch on desktop, mobile or tablet.
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <i className="fa-solid fa-download" style={{ color:"#0d63ef", marginRight: 10 }}></i>
                    Download and watch anytime, anywhere.
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <i className="fa-solid fa-circle-check" style={{ color:"#0d63ef", marginRight: 10 }}></i>
                    Subscribe for Ad-Lite experience.
                  </Box>
                </Box>
              </Grid>
    
              {/* RIGHT SIDE */}
              <Grid size= {{xs:12, md:6}}
                sx={{
                  p: { xs: 3, sm: 4, md: 6 },
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {/* Skip for now */}
                <Typography
                  variant="body2"
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 20,
                    color: "#888",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    "&:hover": { color: "#fff" },
                  }}
                  onClick={handleCloseLogin}
                >
                  Skip for now
                </Typography>
    
                {/* Title */}
                <Typography
                  variant="h5"
                  sx={{ color:"white",fontWeight: "bold",fontSize:"30px", mb: 2 }}
                >
                  Login
                </Typography>
    
                <Typography
                  variant="body2"
                  sx={{ color: "#aaa", fontWeight:"bold" , fontSize:"16px" , mb:4 }}
                >
                  Enjoy Amazon MX Player’s exclusive features and benefits.
                </Typography>
    
                {/* Mobile number input */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <TextField
                    placeholder="Enter Mobile Number"
                    fullWidth
                    variant="outlined"
                    value={mobile}
                    onChange={(e) => {
                      // allow only numbers and max 10 digits
                      const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setMobile(value);
                    }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIphoneIcon sx={{ color: "white", mr: 1 }} />
                            <Typography sx={{ color: "#ccc", fontWeight: "bold" }}>+91</Typography>
                          </InputAdornment>
                        ),
                        sx: {
                          color: "white",
                          "&::placeholder": { color: "#888" },
                          "& input": {
                            color: "white",
                          },
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#444" },
                        "&:hover fieldset": { borderColor: "#777" },
                      },
                    }}
                  />
                </Box>

    
                <Typography variant="caption" sx={{ color: "#777" }}>
                  You’ll get an SMS to verify your number.
                </Typography>
    
                {/* Next Button (Always Visible, Glows Only When Valid) */}
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    backgroundColor: isValid ? "#1e90ff" : "#2a2a2a", // active blue or dim gray
                    boxShadow: isValid
                      ? "0 0 12px rgba(30, 144, 255, 0.7)"
                      : "0 0 0 rgba(0,0,0,0)", // glow only when valid
                    "&:hover": {
                      backgroundColor: isValid ? "#187bcd" : "#2a2a2a",
                      boxShadow: isValid
                        ? "0 0 18px rgba(30,144,255,0.9)"
                        : "0 0 0 rgba(0,0,0,0)",
                    },
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: "bold",
                    py: 1.2,
                    color: "white",
                    transition: "0.3s ease",
                  }}
                  onClick={() => {
                    if (isValid) alert("OTP sent to your number!");
                  }}
                >
                  Next
                </Button>
    
                {/* Divider */}
                <Typography
                  variant="body2"
                  sx={{ color: "#999", my: 2}}
                >
                  Or, use one of the following options.
                </Typography>
    
                {/* Social Login Buttons */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<img src={GoogleIconSVG} alt="Google" width={30} height={30} />}
                    sx={{
                      borderColor: "#444",
                      color: "gray",
                      textTransform: "none",
                      fontSize:"0.80rem",
                      padding:"8px 10px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "#888",
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    Continue with Google
                  </Button>
                
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<img src={FacebookCircledIcon} alt="Facebook" style={{ width: 30, height: 30 }} />}
                    sx={{
                      borderColor: "#444",
                      color: "gray",
                      textTransform: "none",
                      fontSize:"0.80rem",
                      padding:"16px 10px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "#888",
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    Continue with Facebook
                  </Button>
                </Box>

    
                {/* Footer */}
                <Typography
                  variant="caption"
                  sx={{
                    color: "#666",
                    textAlign: "center",
                    display: "block",
                    mt: 3,
                  }}
                >
                  By continuing, you agree to the{" "}
                  <span style={{ color: "#1e90ff", cursor: "pointer" }}>
                    Terms of Use
                  </span>{" "}
                  &{" "}
                  <span style={{ color: "#1e90ff", cursor: "pointer" }}>
                    Privacy Policy
                  </span>
                  .
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Modal>
  

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
          onMouseEnter: isDesktop ? () => clearTimeout(closeTimer.current) : undefined,
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
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.9rem" }}>
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
            backgroundColor: "rgba(17, 24, 33, 0.5)", // semi-transparent dark layer
            backdropFilter: "blur(10px)",             // 👈 adds the frosted-glass blur
            WebkitBackdropFilter: "blur(10px)",       // Safari support
            color: "white",
            width: 400,
            minHeight: 400,
            border: "1px solid rgba(255, 255, 255, 0.1)", // subtle border glow
            py: 1.5,
            px: 0.5,
            "& .MuiMenuItem-root": {
              display: "flex",
              alignItems: "center",
              mb: 1.5, // vertical gap between items
              gap: 1.5, // gap between icon & text
              px: 2,
              py: 1.2,
              borderRadius: 1.5,
              transition: "background 0.2s ease, color 0.2s ease",
            },
            "& .MuiMenuItem-root:hover": {
              color: "#1e90ff",
              backgroundColor: "rgba(255,255,255,0.08)",
            },
            "& .MuiListItemIcon-root": {
              minWidth: 40, // consistent icon spacing
            },
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {/* Top Section */}
        {dropdownItemsTop.map((item) => (
          <MenuItem key={item.text} onClick={handleDropdownClose}>
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              {item.text}
            </ListItemText>
          </MenuItem>
        ))}
      
        {/* Kids Mode Section */}
        <MenuItem
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            py: 1.5,
            px: 2,
            mt: 1,
            borderRadius: 1.5,
            "&:hover .hover-color": { color: "#1e90ff" },
          }}
        >
          <Box
            className="hover-color"
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 3,
              color: kidsMode ? "gold" : "white",
              transition: "color 0.2s ease",
              flex: 1,
            }}
          >
            <EmojiEmotionsIcon sx={{ mt: 1.7, fontSize: 24 }} />
            <Box sx={{ lineHeight: 1.2, maxWidth: "85%" }}>
              <Typography variant="body1" fontWeight={500}>
                Kids Mode
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  lineHeight: 1.3,
                  opacity: 0.7,
                }}
              >
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
      
        <Divider sx={{ backgroundColor: "#333", my: 1.5 }} />
      
        {/* Bottom Section */}
        {dropdownItemsBottom.map((item) => (
          <MenuItem key={item.text} onClick={handleDropdownClose}>
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              {item.text}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>

      
    </Box>
  );
};

export default Navbar;
