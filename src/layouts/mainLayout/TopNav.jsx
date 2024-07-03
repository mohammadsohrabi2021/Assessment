import React from "react";
import { Button, Grid, Typography, Tooltip } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useAppContext } from "../../contexts/app/AppContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const { toggleSidebar } = useAppContext();
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("token");
    navigate("/account/login");
  };

  return (
    <Grid
      container
      display="flex"
      height="60px"
      justifyContent="space-between"
      alignItems="center"
      px={3}
      zIndex={1}
    >
      <a
        onClick={toggleSidebar}
        style={{ display: "flex", gap: "30px", cursor: "pointer" }}
      >
        <Tooltip title="منو">
          <MenuOutlinedIcon />
        </Tooltip>
        <Typography fontFamily="iran-sans">
          سامانه آنلاین مدیریت تکالیف
        </Typography>
      </a>

      <Tooltip title="خروج">
        <Button
          sx={{
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            border: 0,
            borderRadius: 2,
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
            color: "white",
            height: 28,
            padding: "0 20px",
            "&:hover": {
              boxShadow: "0 5px 7px 3px rgba(255, 105, 135, .5)",
              background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
            },
          }}
          onClick={logout}
        >
          خروج
        </Button>
      </Tooltip>
    </Grid>
  );
};

export default TopNav;
