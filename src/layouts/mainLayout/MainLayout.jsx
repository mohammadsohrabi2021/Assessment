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
    width: "20%",
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

      <Grid className="main" style={{  height: "100vh" }}>
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
          // bgcolor={"red"}
          // mt={1}
          flexDirection={"column"}
          // alignItems={"space-between"}
          justifyContent={"space-between"}
          style={{ minHeight: "100vh" }}
          width={showSidebar? '83vw':'100vw'}
        >
          <Grid className="content" style={{ paddingTop: "64px" }}>
            <Grid mr={2}>
              <Outlet />
            </Grid>
          </Grid>
          <Footer />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainLayout;
