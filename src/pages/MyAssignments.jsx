import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, Skeleton, CardActionArea } from '@mui/material';
import { useAppContext } from '../contexts/app/AppContext';
import AssignmentSubmissionsModal from '../components/AssignmentSubmissionsModal';

function MyAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAppContext();
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch('https://assessment.darkube.app/api/Assessment/GetAllAssignments', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAssignments(data);
        } else {
          console.error('Error fetching assignments:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [userInfo.token]);

  const handleCardClick = (assignmentId) => {
    console.log(assignmentId)
    setSelectedAssignment(assignmentId);
    setModalOpen(true);
  };
console.log(assignments?.result)
  return (
    <Grid container spacing={2}>
      {loading ? (
        Array.from(new Array(6)).map((_, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card>
              <CardContent>
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="rectangular" height={118} />
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : assignments?.result?.length > 0 ? (
        assignments?.result?.map((assignment, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card onClick={() => handleCardClick(assignment.assessmentId)}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h6" fontFamily={'iran-sans'}>{assignment?.courseTitle}-{assignment.title}</Typography>
                  <Typography>{assignment.description}</Typography>
                  <Typography>تاریخ شروع: {new Date(assignment.startDate).toLocaleDateString('fa-IR')}</Typography>
                  <Typography>تاریخ پایان: {new Date(assignment.endDate).toLocaleDateString('fa-IR')}</Typography>
                  <Typography>قوانین جریمه: {assignment.penaltyRule}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12} height={'80vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Typography variant="h6" align="center" fontFamily={'iran-sans'} color={'red'}>
            {userInfo?.roleId == '2' ? 'دانشجوی عزیز، متاسفانه شما هیچ تمرینی نداشته‌اید.' : 'استاد گرامی، متاسفانه هیچ تمرینی برای شما ثبت نشده است.'}
          </Typography>
        </Grid>
      )}
      {selectedAssignment && (
        <AssignmentSubmissionsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          assignmentId={selectedAssignment}
        />
      )}
    </Grid>
  );
}

export default MyAssignments;
