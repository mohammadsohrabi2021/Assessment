import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DeleteConfirmationDialog = ({ open, onClose, onConfirm, assessmentTitle }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>حذف تمرین</DialogTitle>
      <DialogContent>
        <Typography>آیا از حذف تمرین "{assessmentTitle}" مطمئن هستید؟</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">لغو</Button>
        <Button onClick={onConfirm} color="primary">تایید</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
