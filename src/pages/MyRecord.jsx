import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useAppContext } from '../contexts/app/AppContext';

const MyRecord = () => {
  const { userInfo } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch('https://assessment.darkube.app/api/Assessment/GetReport', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setReport(data.result);
        } else {
          toast.error('خطا در دریافت کارنامه');
        }
      } catch (error) {
        toast.error('خطا در ارتباط با سرور');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [userInfo.token]);

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (!report) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Typography>اطلاعاتی برای نمایش وجود ندارد</Typography>
      </Grid>
    );
  }

  const { student, scores, scoreAvrge } = report;

  const getStatus = (score) => {
    if (score === 0) return 'غیر قابل قبول';
    if (score > 0 && score < 20) return 'غیر قابل قبول';
    if (score >= 20 && score < 50) return 'قابل قبول';
    if (score >= 50 && score < 80) return 'خوب';
    if (score >= 80 && score <= 100) return 'عالی';
  };

  const groupedScores = scores.reduce((acc, score) => {
    (acc[score.termId] = acc[score.termId] || []).push(score);
    return acc;
  }, {});

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }} spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
          <Box mb={3} textAlign="center">
            <Typography variant="h4" gutterBottom>
              کارنامه دانشجو
            </Typography>
          </Box>
          <Box mb={3}>
            <Typography variant="h6">اطلاعات دانشجو:</Typography>
            <Typography>نام: {student.name}</Typography>
            <Typography>نام خانوادگی: {student.family}</Typography>
            <Typography>شماره تلفن: {student.phoneNumber}</Typography>
            <Typography>ایمیل: {student.email}</Typography>
          </Box>
          {Object.entries(groupedScores).map(([termId, termScores]) => (
            <Box mb={3} key={termId}>
              <Typography variant="h6" gutterBottom>
                ترم: {termId}
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>عنوان درس</TableCell>
                      <TableCell align="right">نمره</TableCell>
                      <TableCell align="right">وضعیت</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {termScores.map((score, index) => (
                      <TableRow key={index}>
                        <TableCell>{score.courseTitle}</TableCell>
                        <TableCell align="right">{score.lastScore}</TableCell>
                        <TableCell align="right">{getStatus(score.lastScore)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}
          <Box textAlign="center">
            <Typography variant="h6">میانگین نمرات:</Typography>
            <Typography variant="h4" align="center" color="primary">
              {scoreAvrge}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MyRecord;
