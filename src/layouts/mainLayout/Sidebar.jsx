import logo from "@assets/images/logo.png";

import { useAppContext } from "../../contexts/app/AppContext";
import { Link, NavLink } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import muneItemSideBar from "../../data/muneItemSideBar";

const Sidebar = () => {
  const { showSidebar, toggleSidebar,userInfo } = useAppContext();
  const filteredMuneItemSideBar = muneItemSideBar.map((section) => {
    if (section.id === 1) {
      return {
        ...section,
        mune: section.mune.filter(
          (item) => !(userInfo?.studentId > 0 && item.id === 3)
        ),
      };
    }
    return section;
  });

  return (
    <Grid
      position={{ xs: "absolute", sm: "none" }}
      zIndex={1}
      className={`sidebar ${!showSidebar ? "collapsed" : ""}`}
    >
      <Grid
        mt={{ xs: 8, sm: 9, md: 2 }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <a className="sidebar-brand d-flex flex-column align-items-center pt-3 mb-0">
          <img src={logo} style={{ height: "80px" }} />
          <Typography fontFamily={"iran-sans"} style={{ fontSize: "90%" }}>
            پنل ادمین
          </Typography>
        </a>
        <ul style={{ listStyleType: "none", padding: "30px" }}>
          {filteredMuneItemSideBar.map((item) => (
            <Grid className="fw-bolder" key={item.title}>
              <li style={{ margin: "10px 0", fontFamily: "iran-sans" }}>
                {item.title}
              </li>
              <ul
                className="sub-menu"
                style={{ listStyleType: "none", padding: 0 }}
              >
                {item.mune.map((itemMune) => (
                  <li key={itemMune.id} className="sidebar-item">
                    <NavLink
                      to={itemMune?.href}
                      className={
                        location.pathname === `/${itemMune.href}`
                          ? "sidebar-link active"
                          : "sidebar-link"
                      }
                    >
                      <Typography
                        variant="span"
                        display={{ xs: "flex", md: "none" }}
                        style={{ flexDirection: "column", padding: "0 15px" }}
                        onClick={toggleSidebar}
                        fontFamily={"iran-sans"}
                        fontSize={"14px"}
                        my={2}
                      >
                        {}
                        {itemMune.name}
                      </Typography>
                      <Typography
                        variant="span"
                        fontFamily={"iran-sans"}
                        fontSize={"14px"}
                        display={{ xs: "none", md: "flex" }}
                        my={2}
                        style={{ flexDirection: "column", padding: "0 15px" }}
                      >
                        {itemMune.name}
                      </Typography>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </ul>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
