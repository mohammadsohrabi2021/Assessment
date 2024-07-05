import React, { useState } from "react";
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
  IconButton,
  Tooltip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useAppContext } from "../contexts/app/AppContext";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { toast } from "react-toastify";
import CreateAssignmentModal from "./CreateAssignmentModal"; // ایمپورت مودال ساخت تمرین

const VisitModalAssessments = ({ open, onClose, assessments, onEdit, onDelete }) => {
  const { userInfo } = useAppContext();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false); // استیت برای باز و بسته کردن مودال ویرایش
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const handleDeleteClick = (assessment) => {
    setSelectedAssessment(assessment);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (assessment) => {
    setSelectedAssessment(assessment);
    setEditModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteDialogOpen(false);
    console.log(selectedAssessment)
    try {
      const response = await fetch(`https://assessment.darkube.app/api/Assessment/DeleteAssessment`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ assessmentId: selectedAssessment?.assessmentId }),
      });
      if (response.ok) {
        toast.success("تمرین با موفقیت حذف شد!");
        onDelete(selectedAssessment.assessmentId);
      } else {
        const errorData = await response.json();
        toast.error(`خطا در حذف تمرین: ${errorData.errors["assessmentDTO"][0]}`);
      }
    } catch (error) {
      console.error("Error deleting assessment:", error);
      toast.error("خطا در ارتباط با سرور");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" mt={2} fontFamily={"iran-sans"} gutterBottom>
          تکالیف تعریف شده
        </Typography>
      </DialogTitle>
      <DialogContent>
        {assessments.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>شماره</TableCell>
                  <TableCell>عنوان</TableCell>
                  <TableCell>توضیحات</TableCell>
                  <TableCell>تاریخ شروع</TableCell>
                  <TableCell>تاریخ پایان</TableCell>
                  <TableCell>قوانین جریمه</TableCell>
                  {userInfo?.studentId > 0 ? null : <TableCell>عملیات</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {assessments.map((assessment, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{assessment.title}</TableCell>
                    <TableCell>{assessment.description}</TableCell>
                    <TableCell>{new Date(assessment.startDate).toLocaleDateString('fa-IR')}</TableCell>
                    <TableCell>{new Date(assessment.endDate).toLocaleDateString('fa-IR')}</TableCell>
                    <TableCell>{assessment.penaltyRule}</TableCell>
                    {userInfo?.studentId > 0 ? null : (
                      <TableCell>
                        <Tooltip title="ویرایش">
                          <IconButton onClick={() => handleEditClick(assessment)}>
                            <Edit sx={{color:'green'}}/>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="حذف">
                          <IconButton onClick={() => handleDeleteClick(assessment)}>
                            <Delete sx={{color:'red'}}/>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography fontFamily={"iran-sans"} fontSize={"12px"} color={"gray"}>
            هیچ ارزیابی در دسترس نیست.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          بستن
        </Button>
      </DialogActions>
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        assessmentTitle={selectedAssessment?.title}
      />
      <CreateAssignmentModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        courseId={selectedAssessment?.courseId}
        assessment={selectedAssessment} // ارسال داده‌های تمرین به مودال
        reloadClassData={onEdit} // تغییر نام به onEdit برای سازگاری با فانکشن ارسال شده
      />
    </Dialog>
  );
};

export default VisitModalAssessments;
