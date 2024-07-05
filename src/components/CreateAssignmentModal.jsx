import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Tooltip,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toast } from "react-toastify";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HelpModal from "./HelpModal";
import { useAppContext } from "../contexts/app/AppContext"; // مسیر فرضی

const CreateAssignmentModal = ({
  open,
  onClose,
  courseId,
  assessment,
  reloadClassData,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm();
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { userInfo } = useAppContext();
  useEffect(() => {
    if (assessment) {
      setValue("title", assessment.title);
      setValue("description", assessment.description);
      setValue("startDate", new Date(assessment.startDate));
      setValue("endDate", new Date(assessment.endDate));
      setValue("penaltyRule", assessment.penaltyRule);
    } else {
      reset(); // Reset form values if no assessment is provided
    }
  }, [assessment, setValue, reset]);
console.log(reloadClassData)
  const onSubmit = async (data) => {
    const penaltyRulePattern = /(\d+[hd] \d+)/;
    if (!penaltyRulePattern.test(data.penaltyRule)) {
      setError("penaltyRule", {
        type: "manual",
        message: "قانون جریمه مطابق با فرمت مورد نظر نیست: 1d 70, 2d 50",
      });
      return;
    }

    const formattedStartDate = data.startDate.toISOString().split("T")[0];
    const formattedEndDate = data.endDate.toISOString().split("T")[0];
    const method = assessment ? "PUT" : "POST";
    const endpoint = assessment
      ? `https://assessment.darkube.app/api/Assessment/UpdateAssessment?AssessmentId=${assessment.assessmentId}&CourseId=${courseId}&Title=${data.title}&Description=${data.description}&StartDate=${formattedStartDate}&EndDate=${formattedEndDate}&FileName=${assessment?.fileName}&&PenaltyRule=${data.penaltyRule}`
      : `https://assessment.darkube.app/api/Assessment/CreateAssessment?CourseId=${courseId?.result?.courseId}&Title=${data.title}&Description=${data.description}&StartDate=${formattedStartDate}&EndDate=${formattedEndDate}&PenaltyRule=${data.penaltyRule}`;

    try {
      const formData = new FormData();
      formData.append(
        "CourseId",
        method === "PUT" ? courseId : courseId?.result?.courseId
      );
      formData.append("Title", data.title);
      formData.append("Description", data.description);
      formData.append("StartDate", formattedStartDate);
      formData.append("EndDate", formattedEndDate);
      formData.append("PenaltyRule", data.penaltyRule);
      if (selectedFile) {
        formData.append("File", selectedFile);
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success(
          `تمرین با موفقیت ${assessment ? "به‌روزرسانی" : "ایجاد"} شد!`
        );
        reset(); // Clear form data
        onClose();
        reloadClassData();
      } else {
        const errorData = await response.json();
        toast.error(
          `خطا در ${assessment ? "به‌روزرسانی" : "ایجاد"} تمرین: ${
            errorData.message
          }`
        );
      }
    } catch (error) {
      console.error(
        `Error ${assessment ? "updating" : "creating"} assignment:`,
        error
      );
      // toast.error("خطا در ارتباط با سرور");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleHelpClick = () => {
    setHelpModalOpen(!handleHelpClick);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography fontFamily={"iran-sans"}>
          {assessment ? "ویرایش تکلیف" : "ایجاد تکلیف جدید"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{ required: "عنوان مورد نیاز است" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="عنوان"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title ? errors.title.message : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={2}>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="توضیحات"
                    fullWidth
                    multiline
                    rows={6}
                  />
                )}
              />
            </Grid>
            <Grid display={"flex"} gap={2}>
              <Grid item xs={6} sm={6}>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: "تاریخ شروع مورد نیاز است" }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      onChange={(date) => field.onChange(date?.toDate())}
                      value={field.value ? new Date(field.value) : null}
                      render={<TextField placeholder="تاریخ شروع" fullWidth />}
                    />
                  )}
                />
                {errors.startDate && (
                  <Typography color="error" variant="body2">
                    {errors.startDate.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{ required: "تاریخ پایان مورد نیاز است" }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      onChange={(date) => field.onChange(date?.toDate())}
                      value={field.value ? new Date(field.value) : null}
                      render={<TextField placeholder="تاریخ پایان" fullWidth />}
                    />
                  )}
                />
                {errors.endDate && (
                  <Typography color="error" variant="body2">
                    {errors.endDate.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
              <Controller
                name="penaltyRule"
                control={control}
                defaultValue=""
                rules={{ required: "قانون جریمه مورد نیاز است" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="قانون جریمه"
                    fullWidth
                    error={!!errors.penaltyRule}
                    helperText={
                      errors.penaltyRule ? errors.penaltyRule.message : ""
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="راهنما">
                            <IconButton
                              onClick={handleHelpClick}
                              sx={{
                                animation: "pulse 2s infinite",
                                "@keyframes pulse": {
                                  "0%": {
                                    transform: "scale(1)",
                                    backgroundColor: "transparent",
                                  },
                                  "50%": {
                                    transform: "scale(1.1)",
                                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                                  },
                                  "100%": {
                                    transform: "scale(1)",
                                    backgroundColor: "transparent",
                                  },
                                },
                              }}
                            >
                              <HelpOutlineIcon />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="file"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    style={{ display: "block", marginTop: "16px" }}
                    onChange={handleFileChange}
                  />
                )}
              />
            </Grid>
            <HelpModal
              open={helpModalOpen}
              onClose={() => setHelpModalOpen(!helpModalOpen)}
            />
          </Grid>
          <DialogActions sx={{ gap: "30px" }}>
            <Button
              onClick={onClose}
              sx={{ fontFamily: "iran-sans" }}
              color="error"
              variant="contained"
            >
              لغو
            </Button>
            <Button
              type="submit"
              sx={{ fontFamily: "iran-sans" }}
              color="success"
              variant="contained"
            >
              {assessment ? "به‌روزرسانی" : "ایجاد"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssignmentModal;
