import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Breadcrumbs,
  Link,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Gold from "../../Assest/MxGold.png";
import log from "../../Assest/Title.png";
import sm from "../../Assest/sm.png";
import upiLogo from "../../Assest/upi-icon.png";

export const MxGoldPage = () => {
  const [plan, setPlan] = useState('annual');
  const [payment, setPayment] = useState('upi');

  const meticulousYellow = '#e09f3e';
  const glowEffect = `0 0 0px ${meticulousYellow}`;

  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#2E2925', minHeight: '100vh', color: '#fff', py: 10 , width:"100%"}}>
      <Grid container>
        {/* Header */}
        <Grid container>
          <Grid
            size={{ lg: 12, md: 12, sm: 12, xs: 12 }}
            sx={{
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: { lg: 6, md: 5, sm: 3, xs: 2 }, // responsive padding
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Left section */}
            <Grid  size={{ lg: 5, md: 3, sm: 3, xs: 2 }} display="flex" alignItems="center">
              <IconButton>
                <ArrowBackIcon sx={{ color: 'white' }} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{
                  ml: 2,
                  fontSize: { lg: "1.5rem", md: "1.3rem", sm: "1.1rem", xs: ".8rem" },
                  fontWeight: 700,
                  color: 'white',
                  whiteSpace: 'nowrap',
                }}
              >
                Amazon MX Player Memberships
              </Typography>
            </Grid>
        
            {/* Right section */}
            <Grid  size={{ lg: 3, md: 3, sm: 3, xs: 2 }} display="flex" alignItems="center">
              <IconButton sx={{ gap: 1 }}>
                <HelpOutlineIcon sx={{ fontSize: { lg: "1.5rem", md: "1.3rem", sm: "1.1rem", xs: ".8rem" },color: 'white' }} />
                <Typography sx={{ fontWeight: 600,fontSize: { lg: "1.5rem", md: "1.3rem", sm: "1.1rem", xs: ".8rem" }, color: 'white' }}>FAQs</Typography>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>


        {/* Breadcrumb */}
        <Grid sx={{ px: { lg: 21, md: 21, sm: 10, xs: 4 }, py: 4 }}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" sx={{ color: '#9e9e9e' }} />}
            aria-label="breadcrumb"
            sx={{ color: '#9e9e9e', fontSize: '14px', fontWeight: 600 }}
          >
            <Link
              underline="hover"
              color="inherit"
              href="/"
              onClick={handleClick}
              sx={{ '&:hover': { color: '#ffffff' } }}
            >
              Home
            </Link>
            <Typography sx={{ color: '#ffffff', fontSize: '14px', fontWeight: 600 }}>
              Amazon MX Player Memberships
            </Typography>
          </Breadcrumbs>
        </Grid>

        {/* Main Content */}
        <Grid container justifyContent="center" spacing={4}>
          {/* Left Section */}
          <Grid size= {{lg:4, md:4}} display={{ lg: "block", md: 'block', sm: 'none', xs: 'none' }}>
            <Box component="img" src={log} alt="MX Logo" sx={{ width: "45%", mb: 3 }} />
            <Box component="img" src={Gold} alt="MX Gold Promo" sx={{ width: '75%', mb: 3 }} />
          </Grid>

          <Grid size= {{sm:11, xs:10}} display={{ lg: "none", md: 'none', sm: 'block', xs: 'block' }}>
            <Box component="img" src={sm} alt="MX Logo" sx={{ width: "100%" }} />
          </Grid>

          {/* Right Section */}
          <Grid size= {{lg:5, md:4, xs:12}}>
            <Card
              sx={{
                backgroundColor: '#1E1A16',
                color: 'white',
                borderRadius: '12px',
                border: '1px solid #3a332e',
                height:"600px",
                p: 3,
              }}
            >
              <CardContent>
                {/* Plan Selection */}
                <Typography
                  variant="h6"
                  fontWeight={700}
                  mb={2}
                  sx={{ color: '#fff', fontSize: '1.2rem' }}
                >
                  Choose Your Plan
                </Typography>

                {/* Annual */}
                <Box
                  onClick={() => setPlan('annual')}
                  sx={{
                    border: plan === 'annual' ? `2px solid ${meticulousYellow}` : '2px solid #444',
                    borderRadius: '10px',
                    backgroundColor: plan === 'annual' ? '#3a332e' : '#2E2925',
                    p: 2,
                    mb: 2,
                    boxShadow: plan === 'annual' ? glowEffect : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: '0.3s',
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    {plan === 'annual' ? (
                      <CheckCircleIcon sx={{ color: meticulousYellow }} />
                    ) : (
                      <RadioButtonUncheckedIcon sx={{ color: meticulousYellow }} />
                    )}
                    <Typography sx={{ fontWeight: 600, fontSize: '1.05rem' }}>Annual</Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                    ₹499 <span style={{ color: '#aaa', fontWeight: 400 }}>/ year</span>
                  </Typography>
                </Box>

                {/* Quarterly */}
                <Box
                  onClick={() => setPlan('quarterly')}
                  sx={{
                    border: plan === 'quarterly' ? `2px solid ${meticulousYellow}` : '2px solid #444',
                    borderRadius: '10px',
                    backgroundColor: plan === 'quarterly' ? '#3a332e' : '#2E2925',
                    p: 2,
                    mb: 2,
                    boxShadow: plan === 'quarterly' ? glowEffect : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: '0.3s',
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    {plan === 'quarterly' ? (
                      <CheckCircleIcon sx={{ color: meticulousYellow }} />
                    ) : (
                      <RadioButtonUncheckedIcon sx={{ color: meticulousYellow }} />
                    )}
                    <Typography sx={{ fontWeight: 600, fontSize: '1.05rem' }}>Quarterly</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography
                      sx={{ textDecoration: 'line-through', color: '#aaa', fontSize: '0.95rem' }}
                    >
                      ₹299
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                      ₹199 <span style={{ color: '#aaa', fontWeight: 400 }}>/ 3 months</span>
                    </Typography>
                  </Box>
                </Box>

                {/* Payment Section */}
                <Typography
                  variant="h6"
                  fontWeight={700}
                  mt={4}
                  mb={2}
                  sx={{ color: '#fff', fontSize: '1.2rem' }}
                >
                  Select Payment Method
                </Typography>

                <Box display="flex" gap={2}>
                  {/* UPI */}
                  <Box
                    onClick={() => setPayment('upi')}
                    sx={{
                      border: payment === 'upi' ? `0px solid ${meticulousYellow}` : '0px solid #444',
                      borderRadius: '10px',
                      backgroundColor: payment === 'upi' ? '#3a332e' : '#2E2925',
                      flex: 1,
                      p: 1.8,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: payment === 'upi' ? glowEffect : 'none',
                      cursor: 'pointer',
                      transition: '0.3s',
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Box component="img" src={upiLogo} alt="UPI" sx={{ width: 30 }} />
                      <Typography fontWeight={600}>UPI</Typography>
                    </Box>
                    {payment === 'upi' &&
                      <CheckCircleIcon sx={{ color: meticulousYellow }} />
                    }
                  </Box>

                  {/* Card */}
                  <Box
                    onClick={() => setPayment('card')}
                    sx={{
                      border: payment === 'card' ? `2px solid ${meticulousYellow}` : '1px solid #444',
                      borderRadius: '10px',
                      backgroundColor: payment === 'card' ? '#3a332e' : '#2E2925',
                      flex: 1,
                      p: 1.8,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: payment === 'card' ? glowEffect : 'none',
                      cursor: 'pointer',
                      transition: '0.3s',
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <CreditCardIcon sx={{ fontSize: 26 }} />
                      <Typography fontWeight={600}>Card</Typography>
                    </Box>
                    {payment === 'card' &&
                      <CheckCircleIcon sx={{ color: meticulousYellow }} />
                    }
                  </Box>
                </Box>

                {/* Join Button */}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: meticulousYellow,
                    color: '#000',
                    fontWeight: 700,
                    mt: 3,
                    py: 1.3,
                    borderRadius: '10px',
                    fontSize: '1rem',
                    boxShadow: `0 0 20px ${meticulousYellow}`,
                    '&:hover': { backgroundColor: '#FFE082', boxShadow: `0 0 25px ${meticulousYellow}` },
                  }}
                >
                  Join MX Gold
                </Button>

                {/* Info Section */}
                <Typography variant="body2" align="center" mt={2} sx={{ color: '#aaa' }}>
                  Already a Member?{' '}
                  <Link href="#" underline="hover" sx={{ color: meticulousYellow }}>
                    Login
                  </Link>
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  mt={2}
                  sx={{ color: '#bbb', fontSize: '0.8rem', lineHeight: 1.4 }}
                >
                  You authorize us to charge ₹499 for the first year. You will be automatically
                  charged ₹499 every year until you cancel. By signing up, you agree to our Terms
                  and Privacy Policy. You may cancel anytime.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MxGoldPage;
