import React from "react";
import { Box, Container, Grid, Typography, IconButton, Stack } from "@mui/material";
import { Facebook, Twitter, YouTube, LinkedIn, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#0d0d0d", color: "white", pt: 6, pb: 1 }}>
      <Container maxWidth="lg">
        {/* Top Section */}
        <Grid container spacing={4}>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              MX Original
            </Typography>
            <Typography variant="body2" color="gray">Aashram</Typography>
            <Typography variant="body2" color="gray">Indori Ishq</Typography>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Movies by Language
            </Typography>
            <Typography variant="body2" color="gray">Hindi Movies</Typography>
            <Typography variant="body2" color="gray">Tamil Movies</Typography>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Movies by Genre
            </Typography>
            <Typography variant="body2" color="gray">Crime Movies</Typography>
            <Typography variant="body2" color="gray">Action Movies</Typography>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Down the Lane
            </Typography>
            <Typography variant="body2" color="gray">2024 Hindi Movies</Typography>
            <Typography variant="body2" color="gray">2023 Web Series</Typography>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              New Shows
            </Typography>
            <Typography variant="body2" color="gray">Rise and Fall</Typography>
            <Typography variant="body2" color="gray">First Copy</Typography>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              International Shows
            </Typography>
            <Typography variant="body2" color="gray">My Home My Destiny</Typography>
            <Typography variant="body2" color="gray">Day Dreamer</Typography>
          </Grid>
        </Grid>

        {/* Divider Section */}
        <Box sx={{ borderBottom: "1px solid #333", my: 4 }} />

        {/* Middle Info Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Watch Jamnapaar 2 Online on Amazon MX Player for Free!
            </Typography>
            <Typography variant="body2" color="gray">
              The wait is finally over! Jamnapaar Season 2 is all set...
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Watch the Latest Movies in Regional Languages
            </Typography>
            <Typography variant="body2" color="gray">
              Stream the best of entertainment in your preferred language.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Stream New Released TV Shows, Trailers Free on MX Player
            </Typography>
            <Typography variant="body2" color="gray">
              While entertainment has no language, it sure bodes well here.
            </Typography>
          </Grid>
        </Grid>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #333", my: 4 }} />

        {/* Bottom Section */}
        <Grid container spacing={5}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3} sx={{height:"100px",width:"30%"}}>
            <Box display="flex" alignItems="center" mb={2} >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                alt="Amazon"
                style={{ height: 22, marginRight: 8 }}
              />
              <Typography fontWeight="bold" color="primary.main">
                MXPLAYER
              </Typography>
            </Box>
            <Typography variant="body2" color="gray">
              Amazon MX Player is your one-stop destination for latest movies,
              popular web shows, and live TV.
            </Typography>
            <Stack direction="row" spacing={1.5} mt={2}>
              <IconButton color="inherit"><Facebook /></IconButton>
              <IconButton color="inherit"><Twitter /></IconButton>
              <IconButton color="inherit"><YouTube /></IconButton>
              <IconButton color="inherit"><LinkedIn /></IconButton>
              <IconButton color="inherit"><Instagram /></IconButton>
            </Stack>
          </Grid>

          {/* Company Links */}
          <Grid item xs={6} sm={3} md={2} lg={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Company
            </Typography>
            {["About Us", "Video Player", "Contact Us", "FAQ"].map((item) => (
              <Typography key={item} variant="body2" color="gray">
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Legal Links */}
          <Grid item xs={6} sm={3} md={2} lg={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Legal
            </Typography>
            {["Download Apps", "Privacy Policy", "Terms of Services", "Compliance Report"].map(
              (item) => (
                <Typography key={item} variant="body2" color="gray">
                  {item}
                </Typography>
              )
            )}
          </Grid>

          {/* Mobile App Section */}
          <Grid item xs={12} md={5} lg={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Install our Mobile App for Best Experience
            </Typography>
            <Typography variant="body2" color="gray">
              Scan this QR code or visit the app store to install our app.
            </Typography>
            <Box display="flex" alignItems="center" mt={2}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5f/QR_code_example.svg"
                alt="QR"
                style={{
                  height: 80,
                  width: 80,
                  background: "white",
                  borderRadius: 8,
                  padding: 8,
                  marginRight: 12,
                }}
              />
              <Box>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  style={{ height: 36, marginBottom: 8 }}
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Download_on_the_App_Store_Badge.svg"
                  alt="App Store"
                  style={{ height: 36 }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom Text */}
        <Typography
          variant="body2"
          color="gray"
          align="center"
          sx={{ mt: 6, borderTop: "1px solid #333", pt: 2 }}
        >
          © {new Date().getFullYear()} Amazon MX Player. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
