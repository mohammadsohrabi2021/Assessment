import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Skeleton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/app/AppContext";
import classroom from "../assets/images/Classroom.jpg";
import noClasses from "../assets/images/noClassses.webp";
import EditCourseDialog from "../components/EditeCourseDialog";
import { ToastContainer, toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import ModaleShareLink from "../components/ModaleShareLink";
function MyClasses() {
  const [classes, setClasses] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [loading, setLoading] = useState(true); // اینیشیال دیفالت لودینگ را true قرار دهید
  const navigate = useNavigate();
  const { userInfo } = useAppContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [copyLinkModalOpen, setCopyLinkModalOpen] = useState(false);
  const [editCourse, setEditeCourse] = useState({});
  const handleEditClick = (course) => {
    setIsEditModalOpen(true);
    setEditeCourse(course);
  };

  const loadCourses = () => {
    setLoading(true);
    fetch("https://assessment.darkube.app/api/Course/Course", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setClasses(data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCourses();
  }, [userInfo.token]);

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    loadCourses(); // بارگیری مجدد داده‌ها پس از بستن مودال
  };

  useEffect(() => {
    fetch("https://assessment.darkube.app/api/Course/Course", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTimeout(() => {
          // افزودن تاخیر برای نمایش اسکلتون
          setClasses(data.result);
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
        setLoading(false);
      });
  }, [userInfo.token]);
  const handleOpenDialog = (course) => {
    setCurrentCourse(course);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleDeleteCourse = async () => {
    try {
      let url = "";
      let method = "DELETE";
      let body = null;

      if (userInfo.roleId === 1) {
        url = "https://assessment.darkube.app/api/Course/DeteteCourse";
        method = "POST";
        body = JSON.stringify({ courseId: currentCourse?.courseId });
      } else {
        url = "https://assessment.darkube.app/api/Course/LeavingClass";
        body = JSON.stringify({ courseId: currentCourse?.courseId });
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Response: ${errorText}`
        );
      }

      const data = await response.json();
      setOpen(false);
      toast.success(data?.message);
      setClasses(data?.result);
    } catch (err) {
      console.error("Error:", err);
      toast.error(`Error: ${err.message}`);
    }
  };

  // const handleClassClick = (courseId) => {
  //   navigate(`/class/${courseId}/assessments`);
  // };
  const skeletonCount = classes.length > 0 ? classes.length : 5;
  const handleOpenDialogCopyLink = (course) => {
    setCopyLinkModalOpen(!copyLinkModalOpen);
    setEditeCourse(course);
  };
  console.log(copyLinkModalOpen);
  return (
    <Grid container gap={2} flexWrap={"wrap"} sx={{ padding: 2 }}>
     
      {loading ? (
        Array.from(new Array(skeletonCount)).map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card raised>
              <Skeleton variant="rectangular" width="100%" height={140} />
              <CardContent>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="80%" />
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <>
          {classes.length > 0 ? (
            <>
              {classes.map((course) => (
                <Grid
                  item
                  key={course.courseId}
                  width={{ xs: "100%", sm: "48%", md: "23.8%" }}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Card
                    raised
                    sx={{
                      "&:hover": {
                        transform: "scale(1.05)",
                        transition: "transform 0.3s",
                      },
                    }}
                  >
                    <CardActionArea
                    // onClick={() => handleClassClick(course.courseId)}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={classroom}
                        alt={course?.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {course?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {course.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActionArea>
                      {userInfo?.studentId > 0 ? null : (
                        <IconButton onClick={() => handleEditClick(course)}>
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton onClick={() => handleOpenDialog(course)}>
                        <DeleteIcon />
                      </IconButton>
                      <Link
                        to={`https://assessment-front.darkube.app/myClasses/${course?.courseId}`}
                      >
                        <IconButton>
                          <VisibilityIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        onClick={() => handleOpenDialogCopyLink(course)}
                      >
                        <CopyAllIcon />
                      </IconButton>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </>
          ) : (
            <Typography
              fontFamily={"iran-sans"}
              textAlign={"center"}
              lineHeight={2}
              color={"red"}
              maxWidth={500}
              margin={"auto"}
            >
              {userInfo?.studentId > 0 ? (
                <>
                  دانشجوی عزیز جناب آقای {userInfo.name} {userInfo.family} شما
                  عضو هیچ کلاسی نیستید
                  <img
                    src={noClasses}
                    alt="بدون کلاس"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                      marginTop: "30px",
                    }}
                  />
                </>
              ) : (
                <>
                  استاد عزیز جناب آقای {userInfo.name} {userInfo.family} ضمن خیر
                  مقدم و خوش آمد گویی به شما ,متاسفانه شما تا به کنون هیچ کلاسی
                  رو ایجاد نکرده اید لطفا برای استفاده از سایت و خدمات انلاین
                  مدیریت تکالیف درسی ,کلاس خود را ایجاد کنید. با تشکر تیم توسعه
                  دهنده سامانه مدیریت آنلاین تکالیف درسی
                  <img
                    src={noClasses}
                    alt="بدون کلاس"
                    style={{ width: "100%", borderRadius: "20px" }}
                  />
                </>
              )}
            </Typography>
          )}
        </>
      )}

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تایید حذف</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            آیا مطمئن هستید که می خواهید کلاس {currentCourse?.title} را حذف
            کنید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>خیر</Button>
          <Button onClick={handleDeleteCourse} autoFocus>
            بله
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditModalOpen} onClose={handleCloseModal}>
        <DialogContent>
          <EditCourseDialog
            editCourse={editCourse}
            handleCloseModal={handleCloseModal}
          />
        </DialogContent>
      </Dialog>
      <ModaleShareLink
        copyLinkCourse={editCourse}
        open={copyLinkModalOpen}
        onClose={() => setCopyLinkModalOpen(!copyLinkModalOpen)}
      />
    </Grid>
  );
}

export default MyClasses;
