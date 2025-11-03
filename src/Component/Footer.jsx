import React from "react";
import Logo from "../Assest/Mx.jpg";
import qrcode from "../Assest/QR-MX.png";
import { FaGooglePlay, FaAppStoreIos } from "react-icons/fa";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { Facebook, Twitter, YouTube, LinkedIn, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "black", color: "white", pt: 6, pb: 1 }}>
      <Container maxWidth="lg">

        {/* ----------- Top Section ----------- */}
        <Grid
          container
          spacing={{lg:5,md:1,sm:5,xs:5}}
          justifyContent={{ xs: "center", sm: "center", md: "flex-start" }}
          textAlign={{ xs: "center", sm: "center", md: "left" }}
        >
          {[
            { title: "MX Original", items: ["Aashram", "Indori Ishq"] },
            { title: "Movies by Language", items: ["Hindi Movies", "Tamil Movies"] },
            { title: "Movies by Genre", items: ["Crime Movies", "Action Movies"] },
            { title: "Down the Lane", items: ["2024 Hindi Movies", "2023 Web Series"] },
            { title: "New Shows", items: ["Rise and Fall", "First Copy"] },
            { title: "International Shows", items: ["My Home My Destiny", "Day Dreamer"] },
          ].map((section, index) => (
            <Grid size= {{xs:6,sm:4,md:2}}  key={index}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {section.title}
              </Typography>
              {section.items.map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  color="gray"
                  sx={{
                    cursor: "pointer",
                    transition: "color 0.3s",
                    "&:hover": { color: "royalblue" },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>

        {/* Divider */}
        <Box sx={{ borderBottom: "1px solid #333", my: 4 }} />

        {/* ----------- Middle Info Section ----------- */}
        <Grid
          container
          spacing={4}
          justifyContent={{ xs: "center", sm: "center", md: "flex-start" }}

        >
          <Grid size= {{xs:12,sm:5,md:4}}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Watch Jamnapaar 2 Online on Amazon MX Player for Free!
            </Typography>
            <Typography variant="body2" color="gray">
              The wait is finally over! Jamnapaar Season 2 is all set.
            </Typography>
          </Grid>
          <Grid size= {{xs:12,sm:5,md:4}}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Watch the Latest Movies in Regional Languages
            </Typography>
            <Typography variant="body2" color="gray">
              Stream the best of entertainment in your preferred language.
            </Typography>
          </Grid>
          <Grid size= {{xs:12,sm:10,md:4}}>
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

        {/* ----------- Bottom Section ----------- */}
        <Grid
          container
          spacing={5}
          justifyContent={{ xs: "center", sm: "center", md: "flex-start" }}
          
        >
          {/* Company Info */}
          <Grid size= {{xs:12,sm:5,md:4,lg:4}}>
            <Box display="flex" justifyContent={{ xs: "center", md: "flex-start" }} mb={2}>
              <img src={Logo} alt="Amazon" />
            </Box>
            <Typography variant="body2" color="gray">
              Amazon MX Player is your one-stop destination for latest movies,
              popular web shows, and live TV.
            </Typography>

            {/* Social Media Icons */}
            <Stack
              direction="row"
              justifyContent={{ xs: "center", md: "flex-start" }}
              spacing={1}
              py={1}
              mt={2}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1, py:4 }}>
                Join us
              </Typography>
              {[Facebook, Twitter, YouTube, LinkedIn, Instagram].map((Icon, i) => (
                <IconButton
                  key={i}
                  color="inherit"
                  sx={{
                    transition: "transform 0.3s, color 0.3s",
                    "&:hover": { transform: "scale(1.4)" },
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Company Links */}
          <Grid size ={{xs:5,sm:2,md:1.5,lg:1.5}}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Company
            </Typography>
            {["About Us", "Video Player", "Contact Us", "FAQ"].map((item) => (
              <Typography
                key={item}
                variant="body2"
                color="gray"
                sx={{
                  cursor: "pointer",
                  transition: "color 0.3s",
                  "&:hover": { color: "royalblue" },
                }}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Legal Links */}
          <Grid size= {{xs:5,sm:3,md:2}}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Legal
            </Typography>
            {["Download Apps", "Privacy Policy", "Terms of Services", "Compliance Report"].map(
              (item) => (
                <Typography
                  key={item}
                  variant="body2"
                  color="gray"
                  sx={{
                    cursor: "pointer",
                    transition: "color 0.3s",
                    "&:hover": { color: "royalblue" },
                  }}
                >
                  {item}
                </Typography>
              )
            )}
          </Grid>

          {/* Mobile App Section */}
          <Grid size= {{xs:12,sm:8,md:4,lg:4}}>
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent={{ xs: "center", sm: "space-between" }}
              sx={{ flexWrap: "wrap", mt: { xs: 2, sm: 0 } }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Install our Mobile App for Best Experience
                </Typography>
              <Box sx={{ flex: 1, minWidth: 240, py: 1 }}>
                <Typography variant="body2" color="gray" sx={{ mb: 1 }}>
                  Open camera or any QR scanner app on your mobile.
                </Typography>
                <Typography variant="body2" color="gray" sx={{ mb: 1 }}>
                  Scan this QR code and you'll be prompted with a download link.
                </Typography>

                <Box display="flex" alignItems={"center"}  py={2}>
                  <Stack direction="row" spacing={2}>
                    <Typography variant="body2" sx={{color:"white",fontWeight: "bold" ,py:1 }}>
                      App Available on
                    </Typography>  
                    <IconButton
                      color="inherit"
                      sx={{
                        bgcolor: "#121212",
                        border: "1px solid #333",
                        borderRadius: 2,
                        p: 1.5,
                        "&:hover": { transform: "scale(1.2)", bgcolor: "#222" },
                        transition: "0.3s",
                      }}
                      aria-label="Google Play"
                    >
                      <FaGooglePlay size={15} />
                    </IconButton>
                    <IconButton
                      color="inherit"
                      sx={{
                        bgcolor: "#121212",
                        border: "1px solid #333",
                        borderRadius: 2,
                        p: 1.5,
                        "&:hover": { transform: "scale(1.2)", bgcolor: "#222" },
                        transition: "0.3s",
                      }}
                      aria-label="App Store"
                    >
                      <FaAppStoreIos size={15} />
                    </IconButton>
                  </Stack>
                </Box>
              </Box>

              {/* QR Code */}
              <Box
                sx={{
                  height: 100,
                  width: 100,
                  background: "white",
                  borderRadius: 2,
                  p: 1,
                  mt: { xs: 3, sm: 0 },
                  display:{lg:"block",md:"none",sm:"block",xs:"none"},
                }}
              >
                <img
                  src={qrcode}
                  alt="QR Code"
                  style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* ----------- Bottom Text ----------- */}
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
