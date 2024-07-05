import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import { useAppContext } from "../contexts/app/AppContext";
import classroom from "../assets/images/Classroom.jpg";
import WestIcon from "@mui/icons-material/West";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import ModaleShareLink from "../components/ModaleShareLink";
import Groups2Icon from "@mui/icons-material/Groups2";
import VisitModalAssessments from "../components/VisitModalAssessments";
import VisitModalStudents from "../components/VisitModalStudents";
import CreateAssignmentModal from "../components/CreateAssignmentModal";

function MyClasses() {
  const { classId } = useParams(); // دریافت پارامتر classId از URL
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAppContext();
  const [copyLinkModalOpen, setCopyLinkModalOpen] = useState(false);
  const [assetsMentModalOpen, setAssetsMentModalOpen] = useState(false);
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [createAssignmentModalOpen, setCreateAssignmentModalOpen] = useState(false);
  const fetchClassData = async () => {
    try {
      const response = await fetch(
        `https://assessment.darkube.app/api/Course/CourseBy${classId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      const data = await response.json();
      setClassData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching class data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
  
    if (classId) {
      fetchClassData();
    }
  }, [classId, userInfo.token]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!classData) {
    return <Typography>No class data found.</Typography>;
  }
  const handleOpenDialogCopyLink = () => {
    setCopyLinkModalOpen(!copyLinkModalOpen);
  };
  const handleOpenDialogVisitAssessment = () => {
    setAssetsMentModalOpen(!assetsMentModalOpen);
  };
  const handleOpenDialogVisitStudent = () => {
    setStudentModalOpen(!assetsMentModalOpen);
  };
  const handleOpenCreateAssignmentModal = () => {
    setCreateAssignmentModalOpen(!createAssignmentModalOpen);
  };
  const handleDeleteAssessment = (assessmentId) => {
    setClassData((prevData) => ({
      ...prevData,
      result: {
        ...prevData.result,
        assessments: prevData.result.assessments.filter(a => a.assessmentId !== assessmentId)
      }
    }));
  };
  const actions = [
    {
      icon: <FileCopyIcon />,
      name: "کپی لینک کلاس",
      onClick: () => handleOpenDialogCopyLink(classData),
    },
    {
      icon: <SaveIcon />,
      name: "مشاهده لیست تکالیف",
      onClick: () => handleOpenDialogVisitAssessment(classData),
    },
    {
      icon: <Groups2Icon />,
      name: "مشاهده لیست دانشجویان",
      onClick: () => handleOpenDialogVisitStudent(classData),
    },

  ];

  return (
    <Grid container justifyContent="center" sx={{ padding: 1 }}>
      <Grid item xs={11.5} sm={7} md={5}>
        <Card>
          <CardMedia
            component="img"
            height="180"
            image={classroom}
            alt={classData?.result.title}
          />
          <CardContent>
            <Grid display={"flex"} justifyContent={"space-between"}>
              <Typography variant="h5" fontFamily={"iran-sans"} gutterBottom>
                کلاس : {classData?.result.title}
              </Typography>
              <Link to={"/myClasses"}>
                <Button
                  variant="contained"
                  sx={{
                    fontFamily: "iran-sans",
                    background:
                      "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
                  }}
                >
                  <WestIcon />
                </Button>
              </Link>
            </Grid>
            <Typography fontFamily={"iran-sans"} gutterBottom>
              استاد: {classData?.result.teacherName}
            </Typography>
            <Typography fontFamily={"iran-sans"} gutterBottom>
              توضیحات : {classData?.result.description}
            </Typography>
            <Typography fontFamily={"iran-sans"} gutterBottom>
              کد ترم : {classData?.result.term}
            </Typography>
            <Typography fontFamily={"iran-sans"} gutterBottom>
              لینک کلاس : https://assessment-front.darkube.app/course/JoinClass/
              {classData?.result.link}
            </Typography>
            <Typography fontFamily={"iran-sans"} gutterBottom>
              ظرفیت کلاس : {classData?.result.countMembers}
            </Typography>
            <Typography fontFamily={"iran-sans"} gutterBottom>
              ظرفیت باقی مانده از کلاس : {classData?.result.countMembers-classData?.result?.student?.length}
            </Typography>
            <Box mt={3} display="flex" justifyContent="space-between" alignItems={'center'}>
              {!userInfo?.studentId>0&&
              <Button variant="contained" color="success" sx={{ fontFamily: 'iran-sans' ,height:'max-content'}}onClick={handleOpenCreateAssignmentModal}>
                ایجاد تکلیف
              </Button>}
             
            <Box sx={{  height: 100,transform: "translateZ(0px)", flexGrow: 1 }}>
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: "absolute", bottom: 16, left: 16 }}
                icon={<SpeedDialIcon />}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.onClick}
                  />
                ))}
              </SpeedDial>
            </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <ModaleShareLink
        copyLinkCourse={classData?.result}
        open={copyLinkModalOpen}
        onClose={() => setCopyLinkModalOpen(!copyLinkModalOpen)}
      />
     <VisitModalAssessments
        assessments={classData?.result?.assessments}
        open={assetsMentModalOpen}
        onClose={() => setAssetsMentModalOpen(!assetsMentModalOpen)}
        onDelete={handleDeleteAssessment}
      />
      <VisitModalStudents
        students={classData?.result?.student}
        open={studentModalOpen}
        onClose={() => setStudentModalOpen(!studentModalOpen)}
      />
       <CreateAssignmentModal
        open={createAssignmentModalOpen}
        onClose={()=>setCreateAssignmentModalOpen(!createAssignmentModalOpen)}
        // onSubmit={handleCreateAssignment}
        courseId={classData?.result}
        reloadClassData={fetchClassData} 
      />
    </Grid>
  );
}

export default MyClasses;