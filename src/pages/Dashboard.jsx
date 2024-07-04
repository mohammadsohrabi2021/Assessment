import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import { toast } from "react-toastify";
import { dataBoxDashboard, dataHalpeDashboard } from "../data/dataBoxDashboard";
import { useAppContext } from "../contexts/app/AppContext";
function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAppContext();
  useEffect(() => {
    // بررسی می‌کنیم که آیا کاربر توکن دارد یا خیر
    if (!isAuthenticated()) {
      navigate("/account/login"); // اگر توکن ندارد، کاربر را به صفحه ورود هدایت می‌کنیم
    } else {
      fetchStatistics(); // بررسی نقش کاربر
    }
  }, [navigate]);

  const fetchStatistics = async () => {
    try {
      const url =
        !userInfo?.studentId > 0
          ? "https://assessment.darkube.app/api/Statistics/TeacherStatistics"
          : "https://assessment.darkube.app/api/Statistics/StudentStatistics";

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      toast.error("Error fetching statistics");
      setLoading(false);
    }
  };

  const filteredMuneItemDashboard = dataBoxDashboard.filter((item) => {
    if (!userInfo?.studentId > 0) {
      return item.id !== 3 && item.id !== 1; // دانشجو به ایدی ۳ و ۵ دسترسی نداشته باشد
    } else if (userInfo?.studentId > 0) {
      return item.id !== 6 && item.id !== 5; // استاد به ایدی ۳ دسترسی نداشته باشد
    }
    return true;
  });  const filteredMuneHelpeItemDashboard = dataHalpeDashboard.filter((item) => {
    if (!userInfo?.studentId > 0) {
      return item.id !== 3 && item.id !== 1&& item.id !== 2 && item.id !== 4; // دانشجو به ایدی ۳ و ۵ دسترسی نداشته باشد
    } else if (userInfo?.studentId > 0) {
      return item.id !== 6 && item.id !== 5; // استاد به ایدی ۳ دسترسی نداشته باشد
    }
    return true;
  });
  console.log(filteredMuneItemDashboard);
  return (
    <Grid container sx={{ padding: 2 }}>
      {loading ? (
        <Typography fontFamily={"iran-sans"} textAlign={"center"}>
          در حال دریافت اطلاعات از سمت سرور لطفا صبور باشید ...
        </Typography>
      ) : (
        <>
          <Grid
            width={"100%"}
            display={"flex"}
            flexDirection={{ xs: "column", sm: "row" }}
            flexWrap={{ xs: "", sm: "wrap" }}
            gap={{ xs: "10px", sm: "20px", md: "30px" }}
          >
            {filteredMuneItemDashboard.map((item) => (
              <Grid item xs={12} sm={5.5} md={2.8} key={item.id}>
                <Card sx={{ width: "290px" }}>
                  <CardContent sx={{ display: "flex", gap: "30px" }}>
                    {item.icon}
                    <Grid>
                      <Typography fontFamily={"iran-sans"}>
                        {item.title}{" "}
                      </Typography>
                      <Typography>
                        {item.value === null ? (
                          0
                        ) : (
                          <>{stats?.result?.[item.value]}</>
                        )}
                      </Typography>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid mt={5}>
            <Typography fontFamily={"iran-sans"} color={"gray"}>
              {userInfo?.studentId > 0 ? (
                <>
                  دانشجوی عزیز جناب آقای {userInfo?.name} {userInfo?.family}{" "}
                  لیست گزارشات فعالیت شما در سامانه به شرح زیر هست :
                </>
              ) : (
                <>
                  استاد عزیز جناب آقای {userInfo?.name} {userInfo?.family} لیست
                  گزارش فعالیت های شما در سامانه به شکل زیر هست :
                </>
              )}
            </Typography>
            <List>
              {filteredMuneHelpeItemDashboard.map((item) => (
                <ListItem key={item.id}>
                  {item.icon}
                  <Typography fontFamily={"iran-sans"} color={item.color}>
                    {item.text}{" "}
                    {item.value === null ? (
                      0
                    ) : (
                      <>{stats?.result?.[item.value]}</>
                    )}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Grid>
        </>
      )}
    </Grid>
  );
}

function isAuthenticated() {
  return !!Cookies.get("token");
}

export default Dashboard;
