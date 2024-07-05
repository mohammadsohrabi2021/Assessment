import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import Footer from "./Footer";
import Grid from "@mui/material/Grid";
import { useAppContext } from "../../contexts/app/AppContext";
import Cookies from "js-cookie";
const MainLayout = () => {
  const { showSidebar } = useAppContext();
  const token = Cookies.get("token");
  const navigate = useNavigate();
  if (!token) {
    navigate("/account/login");
  }
  const sidebarStyle = {
    overflowY: "auto",
    overflowX: "hidden",
    height: "100vh",
    width: "17%",
    scrollbarWidth: "none" /* Firefox */,
    msOverflowStyle: "none" /* Internet Explorer */,
    "&::-webkit-scrollbar": {
      width: 0,
      background: "transparent",
    },
  };
  return (
    <Grid display={"flex"} style={{ minHeight: "100vh" }} position={"relative"}>
      {showSidebar ? (
        <Grid display={"flex"} mt={7} sx={sidebarStyle}>
          <Sidebar />
        </Grid>
      ) : (
        <Grid>
          <Sidebar />
        </Grid>
      )}

      <Grid
        item
        className="main"
        style={{ flexGrow: 1, height: "100vh", overflow: "auto" }}
      >
        <Grid
          position={"fixed"}
          left={0}
          right={0}
          bgcolor={"#343a4b"}
          zIndex={1}
        >
          <TopNav />
        </Grid>

        <Grid
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          style={{ minHeight: "100vh" }}
          width={showSidebar ? "83vw" : "100vw"}
        >
          <Grid
            container
            direction={"column"}
            justifyContent={"space-between"}
            style={{ minHeight: "100vh", paddingTop: "64px", overflow: "auto" }}
          >
            <Grid
              item
              className="content"
              style={{ flexGrow: 1, paddingRight: "16px", overflow: "auto" }}
            >
              <Outlet />
            </Grid>
            <Footer />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainLayout;
