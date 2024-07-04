import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAccount from "../components/HeaderAccount";
import FooterAccount from "../components/FooterAccount";
import { Box, Grid } from "@mui/material";
// import logo from '../assets/images/animated.gif'
function IdentityLayout() {
  const myStyle = {
    backgroundImage:'../assets/images/animated.gif',
    height: "100vh",
    // marginTop: "-70px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    
};
  return (
    <Grid display={'flex'} flexDirection="column" style={{ minHeight: '100vh' }} sx={myStyle}  className="IdentityLayout">
      <HeaderAccount />
      <Grid item style={{ flexGrow: 1, overflowY: 'auto' }}>
        <Box  height={'100%'}>
          <Outlet />
        </Box>
      </Grid>
      <FooterAccount />
    </Grid>
  );
}

export default IdentityLayout;
