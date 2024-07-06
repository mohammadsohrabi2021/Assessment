import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link
} from '@mui/material';
import { toast } from 'react-toastify';
import { useAppContext } from '../contexts/app/AppContext';

const AssignmentSubmissionsModal = ({ open, onClose, assignmentId }) => {
  const { userInfo } = useAppContext();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState({});

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      console.log(`Fetching submissions for assignmentId: ${assignmentId}`); // Debugging

      try {
        const response = await fetch(`https://assessment.darkube.app/api/Assessment/AssignmentSubmissions/${assignmentId}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched submissions:', data); // Debugging
          setSubmissions(data.result);
        } else {
          console.error('Error fetching submissions:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    if (open && assignmentId) {
      fetchSubmissions();
    }
  }, [assignmentId, open, userInfo.token]);

  const handleScoreChange = (e, asId) => {
    setScore({ ...score, [asId]: e.target.value });
  };

  const handleScoreSubmit = async (asId) => {
    try {
      const response = await fetch('https://assessment.darkube.app/api/Assessment/ScoreRegistration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          aS_Id: asId,
          score: score[asId],
        }),
      });
console.log(response)
      if (response.ok) {
        toast.success('نمره با موفقیت ثبت شد!');
        // به‌روزرسانی نمره ثبت شده در جدول
        setSubmissions((prev) =>
          prev.map((submission) =>
            submission.aS_Id === asId
              ? { ...submission, rawScore: score[asId] }
              : submission
          )
        );
      } else {
        const errorData = await response.json();
        toast.error(`خطا در ثبت نمره: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting score:', error);
      toast.error('خطا در ارتباط با سرور');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>پاسخ‌های ارسال شده</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : submissions.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>شماره</TableCell>
                  <TableCell>دانشجو</TableCell>
                  <TableCell>پاسخ تشریحی</TableCell>
                  <TableCell>پاسخ فایلی</TableCell>
                  <TableCell>نمره</TableCell>
                  <TableCell>نمره ثبت شده</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.map((submission, index) => (
                  <TableRow key={submission.aS_Id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{`${submission.student.name} ${submission.student.family}`}</TableCell>
                    <TableCell>{submission.text || 'بدون پاسخ متنی'}</TableCell>
                    <TableCell>
                      {submission.fileName ? (
                        <Link href={`https://assessment.s3.ir-thr-at1.arvanstorage.ir/${submission.fileName}`} target="_blank" rel="noopener noreferrer">
                          دانلود فایل
                        </Link>
                      ) : (
                        'بدون فایل'
                      )}
                    </TableCell>
                    <TableCell>
                      <Grid container spacing={1}>
                        <Grid item xs={8}>
                          <TextField
                            fullWidth
                            type="number"
                            value={score[submission.aS_Id] || ''}
                            onChange={(e) => handleScoreChange(e, submission.aS_Id)}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleScoreSubmit(submission.aS_Id)}
                          >
                            ثبت
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>{submission.rawScore || 'بدون نمره'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>هیچ پاسخی یافت نشد</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignmentSubmissionsModal;
