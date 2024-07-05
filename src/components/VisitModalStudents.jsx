import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";

const VisitModalStudents = ({ open, onClose, students }) => {
    console.log(students)
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" mt={2} fontFamily={"iran-sans"} gutterBottom>
          لیست دانشجویان
        </Typography>
      </DialogTitle>
      <DialogContent>
        {students?.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>شماره</TableCell>
                  <TableCell>نام</TableCell>
                  <TableCell>نام خانوادگی</TableCell>
                  <TableCell>تلفن </TableCell>
                  <TableCell>ایمیل </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.family}</TableCell>
                    <TableCell>{student.phoneNumber}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography fontFamily={"iran-sans"} fontSize={"12px"} color={"gray"}>
            دانش آموزی در دسترس نیست.
          </Typography>
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

export default VisitModalStudents;
