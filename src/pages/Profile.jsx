import React from 'react';
import { useAppContext } from '../contexts/app/AppContext';
import { Card, CardContent, Typography, Avatar, Grid, Button, CardActions, Box, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';

function Profile() {
  const { userInfo } = useAppContext();
  const isTeacher = userInfo?.roleId === 1;
  const roleSpecificInfo = isTeacher ? `استاد ${userInfo?.family}` : `دانشجوی ${userInfo?.family}`;

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ mt: 4, p: 2 }}>
      <Paper elevation={6} sx={{ maxWidth: 700, width: '100%', p: 3 }}>
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent={'center'} mb={3}>
              <Avatar sx={{ width: 120, height: 120, mb: 2 }} src="/path/to/user/image.jpg" />
              <Typography variant="h5" component="div" gutterBottom fontFamily={'iran-sans'} textAlign={'center'}>
                {roleSpecificInfo}, خوش آمدید!
              </Typography>
              <Typography color="text.secondary"  fontFamily={'iran-sans'} my={1}>
                {isTeacher ? `کد استاد: ${userInfo?.teacherCode}` : `شماره دانشجویی: ${userInfo?.studentId}`}
              </Typography>
              <Typography color="text.secondary" gutterBottom fontFamily={'iran-sans'}>
                کد ملی: {userInfo?.codeMelli}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} display="flex" alignItems="center">
                <EmailIcon sx={{ mr: 1 }} />
                <Typography fontFamily={'iran-sans'}>{userInfo?.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} display="flex" alignItems="center">
                <PhoneIcon sx={{ mr: 1 }} />
                <Typography fontFamily={'iran-sans'}>{userInfo?.phoneNumber}</Typography>
              </Grid>
              {isTeacher && (
                <Grid item xs={12} display="flex" alignItems="center">
                  <AssignmentIcon sx={{ mr: 1 }} />
                  <Typography color={'gray'} fontFamily={'iran-sans'}>مدیریت تکالیف دانشجویی</Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
          <CardActions>
            <Button variant="outlined" sx={{ mx: 'auto' }} onClick={() => console.log('Edit Profile')}>
              ویرایش اطلاعات
            </Button>
          </CardActions>
        </Card>
      </Paper>
    </Grid>
  );
}

export default Profile;
