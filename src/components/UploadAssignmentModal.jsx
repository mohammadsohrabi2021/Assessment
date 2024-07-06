import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useAppContext } from "../contexts/app/AppContext";
import { useForm } from "react-hook-form";

const UploadAssignmentModal = ({ open, onClose, assessment }) => {
  const {
    control,
    reset,
    formState: { errors },
  } = useForm();
  const { userInfo } = useAppContext();
  const [textResponse, setTextResponse] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!textResponse && !file) {
      toast.error("لطفاً حداقل یکی از فیلدها را پر کنید.");
      return;
    }

    if (!assessment || !assessment.assessmentId) {
      toast.error("مشکلی در بارگذاری تمرین وجود دارد.");
      return;
    }

    const formData = new FormData();
    formData.append("AssignmentId", assessment.assessmentId);
    if (textResponse) formData.append("Text", textResponse);
    if (file) {
      formData.append("File", file);
    }

    // نمایش محتوای formData در console
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch("https://assessment.darkube.app/api/Assessment/AssignmentSubmission", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("تکلیف با موفقیت ارسال شد!");
        onClose();
        reset(); // ریست کردن مقادیر فرم
        setTextResponse(""); // پاک کردن مقدار textResponse
        setFile(null); // پاک کردن مقدار file
      } else {
        const errorData = await response.json();
        toast.error(`خطا در ارسال تکلیف: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
      toast.error("خطا در ارتباط با سرور");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>ارسال تکلیف</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          پاسخ متنی
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={textResponse}
          onChange={(e) => setTextResponse(e.target.value)}
        />
        <Typography variant="body1" gutterBottom mt={2}>
          بارگذاری فایل
        </Typography>
        <input type="file" onChange={handleFileChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          بستن
        </Button>
        <Button onClick={handleSubmit} color="primary">
          ارسال
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadAssignmentModal;
