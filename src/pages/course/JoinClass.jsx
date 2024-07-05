import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Box, CircularProgress, Paper, Card, CardContent } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppContext } from "../../contexts/app/AppContext";

function JoinClass() {
  const { classId } = useParams();
  const { userInfo } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [classInfo, setClassInfo] = useState(null);
  const navigate = useNavigate();
  const [isTeacher, setIsTeacher] = useState(false);
  const [userName, setUserName] = useState('');
  
  console.log(classInfo);
  
  useEffect(() => {
    if (userInfo) {
      const isTeacher = userInfo.roleId == '1';
      setIsTeacher(isTeacher);
      setUserName(`${userInfo.name} ${userInfo.family}`);
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchClassInfo = async () => {
      try {
        const response = await fetch(`https://assessment.darkube.app/api/Course/GetCourseBy${classId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setClassInfo(data.result);
        } else {
          toast.error(`خطا در دریافت اطلاعات کلاس: ${data.message}`);
        }
      } catch (error) {
        console.error('Error fetching class data:', error);
        toast.error('خطا در ارتباط با سرور');
      }
    };

    fetchClassInfo();
  }, [classId, userInfo.token]);

  const handleJoinClass = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://assessment.darkube.app/api/Course/JoinClass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ classLink: classId }),
      });

      // if (response.ok) {
      //   toast.success('با موفقیت به کلاس پیوستید!');
      //   navigate(`/myClasses/${classInfo?.courseId}`);
      // } else {
      //   const errorData = await response.json();
      //   toast.error(`خطا در پیوستن به کلاس: ${errorData.message}`);
      // }
      const data = await response.json();
    console.log(data?.statusCode)
      if (data?.statusCode === 409) {
        toast.warning(data.message);
        navigate(`/myClasses/${classInfo?.courseId}`);
      } else if (response.ok) {
        toast.success('با موفقیت به کلاس پیوستید!');
        navigate(`/myClasses/${classInfo?.courseId}`);
      } else {
        toast.error(`خطا در پیوستن به کلاس: ${data.message}`);
      }
    } catch (error) {
      console.error('Error joining class:', error);
      toast.error('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  if (!classInfo) {
    return (
      <Grid container alignItems="center" justifyContent="center" direction="column" sx={{ height: '80vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid container alignItems="center" justifyContent="center" direction="column" sx={{ height: '80vh' }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, textAlign: 'center', maxWidth: 500, width: '100%' }}>
        <Typography variant="h4" color={'green'} mb={2} sx={{ fontFamily: 'iran-sans', fontWeight: 'bold' }}>
          خوش آمدید!
        </Typography>
        {isTeacher ? (
          <>
            <Typography color={'gray'} variant="h6" mb={4} sx={{ fontFamily: 'iran-sans' }}>
              استاد عزیز {userName}، شما خودتون کلاس را ساختید و نمی‌توانید دوباره وارد شوید.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/myClasses')}
              sx={{ fontFamily: 'iran-sans', minWidth: 200 }}
            >
              بازگشت به کلاس‌ها
            </Button>
          </>
        ) : (
          <>
            <Typography color={'gray'} variant="h6" mb={2} sx={{ fontFamily: 'iran-sans' }}>
              دانشجوی عزیز {userName}، به کلاس {classInfo.title} خوش آمدید.
            </Typography>
            <Card sx={{ mt: 2, mb: 4 }}>
              <CardContent sx={{display:'flex' ,flexDirection:'column',gap:'30px'}}>
              <Grid display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography variant="h6" color={'orange'} sx={{ fontFamily: 'iran-sans' }}>نام استاد: {classInfo.teacherName}</Typography>
                <Typography variant="body1" color={'blue'} sx={{ fontFamily: 'iran-sans' }}>ترم: {classInfo.term}</Typography>
              </Grid>
              <Grid display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography variant="body1" sx={{ fontFamily: 'iran-sans' }}>توضیحات: {classInfo.description}</Typography>
                <Typography variant="body1" sx={{ fontFamily: 'iran-sans' }}>ظرفیت: {classInfo.countMembers}</Typography>
              </Grid>
              </CardContent>
            </Card>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleJoinClass}
              disabled={loading}
              sx={{ fontFamily: 'iran-sans', minWidth: 200 }}
            >
              {loading ? <CircularProgress size={24} /> : 'پیوستن به کلاس'}
            </Button>
          </>
        )}
      </Paper>
    </Grid>
  );
}

export default JoinClass;
