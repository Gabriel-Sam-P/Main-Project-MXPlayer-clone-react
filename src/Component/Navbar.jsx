import React, { useState, useRef } from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import TranslateIcon from '@mui/icons-material/Translate';
import HistoryIcon from '@mui/icons-material/History';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CastIcon from '@mui/icons-material/Cast';
import DownloadIcon from '@mui/icons-material/Download';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Logo from '../Assest/Mx.jpg';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery('(min-width:600px) and (max-width:1024px)');
  const isDesktop = useMediaQuery('(min-width:1025px)');

  const navLinks = ['Shows', 'Movies', 'MX VDesi', 'New In 2025', 'Trailers'];

  const menuItems = {
    Shows: ['Reality Shows', 'Drama Series', 'Comedy Shows'],
    Movies: ['Action', 'Horror', 'Romantic'],
    'MX VDesi': ['Hindi Dubbed', 'Web Series'],
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState('');
  const isMenuOpen = Boolean(anchorEl);
  const closeTimer = useRef(null);

  // Dropdown menu state for Menu icon button
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isDropdownOpen = Boolean(menuAnchorEl);

  const [kidsMode, setKidsMode] = useState(false);

  // Handle hover on nav links for dropdown submenu (desktop)
  const handleMenuOpen = (event, menuLabel) => {
    if (menuItems[menuLabel]) {
      clearTimeout(closeTimer.current);
      setAnchorEl(event.currentTarget);
      setSelectedMenu(menuLabel);
    } else {
      setAnchorEl(null);
      setSelectedMenu('');
    }
  };

  // Close submenu with slight delay to prevent flicker
  const handleMenuClose = () => {
    closeTimer.current = setTimeout(() => {
      setAnchorEl(null);
      setSelectedMenu('');
    }, 150);
  };

  // Open main dropdown from menu icon
  const handleDropdownOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setMenuAnchorEl(null);
  };

  // Top and bottom dropdown items replacing drawer content
  const dropdownItemsTop = [
    { icon: <AddIcon />, text: 'My List' },
    { icon: <TranslateIcon />, text: 'Language Preferences' },
    { icon: <HistoryIcon />, text: 'Watch History' },
  ];

  const dropdownItemsBottom = [
    { icon: <CastIcon />, text: 'Activate TV' },
    { icon: <DownloadIcon />, text: 'Download App' },
    { icon: <HelpOutlineIcon />, text: 'Help Center' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top AppBar */}
      <AppBar position="static" sx={{ backgroundColor: 'black', px: 2 }}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
            {/* Logo */}
            <Grid size= {{lg:2, md:2, sm:2, xs:2}}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb:1.5 }}>
                <img src={Logo} alt="MX Player Logo" style={{ height: '35px' }} />
              </Box>
            </Grid>

            {/* Nav Links - Desktop */}
            {isDesktop && (
              <Grid   size= {{lg:5, md:6, sm:6, xs:6}} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3}}>
                {navLinks.map((label, index) => (
                  <Typography
                    key={index}
                    onMouseEnter={(e) => handleMenuOpen(e, label)}
                    sx={{
                      cursor: 'pointer',
                      color: selectedMenu === label && isMenuOpen ? '#1e90ff' : 'white',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      transition: 'color 0.3s',
                      '&:hover': { color: '#1e90ff' },
                      paddingBottom: '4px',
                      borderBottom:
                        selectedMenu === label && isMenuOpen
                          ? '2px solid #1e90ff'
                          : '2px solid transparent',
                    }}
                  >
                    {label}
                  </Typography>
                ))}
              </Grid>
            )}

            {/* Right Side */}
            <Grid
              item
              lg={4}
              md={5}
              sm={6}
              xs={4}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: {xs:1, sm:2, md:3}
              }}
            >
              <IconButton sx={{ color: 'white' }}>
                <SearchIcon />
              </IconButton>

              {!isMobile && (
                <Button
                  variant="outlined"
                  startIcon={<PlayCircleIcon />}
                  sx={{
                    color: '#fff',
                    borderColor: '#d4af37',
                    backgroundColor: '#2b2100',
                    '&:hover': {
                      borderColor: '#ffd700',
                      backgroundColor: '#3a2e00',
                    },
                    fontSize: '0.75rem',
                    textTransform: 'none',
                    borderRadius: '20px',
                    px: 1,
                  }}
                >
                  <Typography variant='secondary' sx={{textAlign:'center',p:0.3}}>UPGRADE TO MX GOLD</Typography>
                </Button>
              )}

              {!isMobile && (
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                  }}
                >
                  Login
                </Typography>
              )}

              {/* Menu icon triggers dropdown menu */}
              <IconButton sx={{ color: 'white' }} onClick={handleDropdownOpen}>
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* Dropdown menu for nav link submenu */}
          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 200 }}
            MenuListProps={{
              onMouseLeave: isDesktop ? handleMenuClose : undefined,
            }}
            PaperProps={{
              sx: {
                backgroundColor: 'rgba(17, 24, 33, 0.8)',
                color: 'white',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.3)',
                minWidth: '150px',
                backdropFilter:'blur(6px)'
              },
              onMouseEnter: () => clearTimeout(closeTimer.current),
              onMouseLeave: isDesktop ? handleMenuClose : undefined,
            }}
            sx={{ mt: 2.5 }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {menuItems[selectedMenu]?.map((item, idx) => (
              <MenuItem
                key={idx}
                onClick={handleMenuClose}
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  px: 2,
                  py: 1,
                }}
              >
                <Typography
                  variant="secondary"
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'white',
                    transition: 'color 0.2s',
                    '&:hover': {
                      color: '#1e90ff',
                    },
                  }}
                >
                  {item}
                </Typography>
              </MenuItem>
            ))}
          </Menu>


      {/* Dropdown menu replacing Drawer content */}
      <Menu
        anchorEl={menuAnchorEl}
        open={isDropdownOpen}
        onClose={handleDropdownClose}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(17, 24, 33, 0.95)',
            color: 'white',
            width: 350,
            borderRadius: 2,
            paddingY: 1,
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {/* Top Section Items */}
        {dropdownItemsTop.map((item, idx) => (
          <MenuItem
            key={idx}
            onClick={handleDropdownClose}
            sx={{
              '&:hover': {
                color: '#1e90ff',
                backgroundColor: 'transparent',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 32 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}

        {/* Kids Mode Switch */}
          <MenuItem
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1.5,
              px: 2,
              minWidth: 280,
              '&:hover .hover-color': {
                color: '#1e90ff', // Blue on hover
              }
            }}
          >
            <Box
              className="hover-color"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.2,
                color: kidsMode ? 'gold' : 'white',
                transition: 'color 0.2s ease'
              }}
            >
              <EmojiEmotionsIcon />
              <Box sx={{ lineHeight: 1.2 }}>
                <Typography variant="body1" fontWeight={500}>
                  Kids Mode
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', whiteSpace: 'normal' }}
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


        <Divider sx={{ backgroundColor: '#333', my: 1 }} />

        {/* Bottom Section Items */}
        {dropdownItemsBottom.map((item, idx) => (
          <MenuItem
            key={idx}
            onClick={handleDropdownClose}
            sx={{
              '&:hover': {
                color: '#1e90ff',
                backgroundColor: 'transparent',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 32 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>

      {/* Bottom Nav for Tablet and Mobile */}
      {(isTablet || isMobile) && (
        <Grid
          container
          spacing={2}
          px={2}
          py={1}
          sx={{
            backgroundColor: '#111821',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Grid item>
            <HomeIcon sx={{ color: '#1e90ff', fontSize: '1.5rem' }} />
          </Grid>
          {navLinks.map((label, index) => (
            <Grid
              item
              key={index}
              sx={{ textAlign: 'center' }}
              onClick={(e) => handleMenuOpen(e, label)}
            >
              <Typography
                sx={{
                  color: selectedMenu === label && isMenuOpen ? '#1e90ff' : 'white',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#1e90ff',
                  },
                }}
              >
                {label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Navbar;
