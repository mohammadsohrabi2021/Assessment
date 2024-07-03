import { Box, Button, Grid, Typography, useMediaQuery, Popover } from "@mui/material";
import React, { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
const styleButton = {
    minWidth: "120px",
    color: "#fff",
    boxShadow: "0 2px 5px 0 rgba(0, 0, 0, .26)",
    borderRadius: "25px",
    gap:'10px'
  };
function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography>Mohammad Sohrabi</Typography>
      </Toolbar>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            // backgroundColor: 'rgba(255, 255, 255, 0.8)',
            // backdropFilter: 'blur(13px)',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            marginTop: '10px',
            // padding: '10px',
            width: '100%',
            // maxWidth: '300px', // you can adjust this as needed
          }
        }}
      >
       <Box display={"flex"}  gap={"60px"}>
       <Link to={'/account/login'}>
            <Button sx={{ backgroundColor: "#1f91f3a3" }} style={styleButton}>
           ورود <FingerprintIcon />
            </Button>
            </Link>
            <Link to={'/account/register'}> 
            <Button sx={{ backgroundColor: "#ff1493a3" }} style={styleButton}>
           ثبت نام <PersonAddIcon />
            </Button>
            </Link>
          </Box>
      </Popover>
    </Box>
  );
}

function HeaderAccount() {
  const matches = useMediaQuery("(min-width:768px)");

  return (
    <Grid
      height={"120px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-around"}
    //   flexDirection={"row-reverse"}
      color={"#fff"}
    >
      {matches ? (
        <>
          <Typography>Mohammad Sohrabi</Typography>
          <Box display={"flex"} gap={"60px"}>
            <Link to={'/account/login'}>
            <Button sx={{ backgroundColor: "#1f91f3a3" }} style={styleButton}>
            <FingerprintIcon />   ورود 
            </Button>
            </Link>
            <Link to={'/account/register'}> 
            <Button sx={{ backgroundColor: "#ff1493a3" }} style={styleButton}>
            <PersonAddIcon />    ثبت نام 
            </Button>
            </Link>
          </Box>
        </>
      ) : (
        <ButtonAppBar />
      )}
    </Grid>
  );
}

export default HeaderAccount;
