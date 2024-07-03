import React, { useEffect, useState } from 'react';
import {
  Grid, TextField, Button, Dialog, DialogContent, DialogTitle,
  FormControl, InputLabel, Select, MenuItem, CircularProgress
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useAppContext } from '../contexts/app/AppContext'; // مسیر فرضی
import { ToastContainer, toast } from 'react-toastify';

function EditCourseDialog({ editCourse, open, onClose,handleCloseModal }) {
  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      teacherId: '',
      termId: '',
      title: '',
      description: '',
      countMembers: ''
    }
  });

  const { userInfo } = useAppContext(); // دسترسی به اطلاعات کاربر و توکن
  const [loading, setLoading] = useState(false);
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    fetch('https://assessment.darkube.app/api/Course/Terms')
      .then(response => response.json())
      .then(data => {
        setTerms(data);
        if (editCourse) {
          // تنظیم مقادیر فرم با داده‌های دریافتی بعد از دریافت ترم‌ها
          setValue('teacherId', editCourse.teacherId);
          setValue('termId', editCourse.termId);
          setValue('title', editCourse.title);
          setValue('description', editCourse.description);
          setValue('countMembers', editCourse.countMembers);
        }
      })
      .catch(error => {
        toast.error('خطا در دریافت اطلاعات ترم: ' + error.message);
      });
  }, [editCourse, setValue]);
  console.log(editCourse)
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('https://assessment.darkube.app/api/Course/UpdateCourse', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.token}`
        },
        body: JSON.stringify({
          courseId: editCourse?.courseId,
          termId: data.termId,
          title: data.title,
          description: data.description,
          changeLink: true||editCourse?.link,
          countMembers: data.countMembers
        })
      });
      console.log(data)
      const result = await response.json();
      if (response.ok) {
        toast.success('کلاس با موفقیت ویرایش شد!');
        reset();
        handleCloseModal();
      } else {
        toast.error('خطا در ویرایش کلاس: ' + result.message);
      }
    } catch (error) {
      toast.error('خطا در ویرایش کلاس: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
 <Grid>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Controller
                name="title"
                control={control}
                rules={{ required: 'عنوان کلاس الزامی است' }}
                render={({ field }) => (
                  <TextField {...field} label="عنوان" variant="outlined" fullWidth margin="normal" error={!!errors.title} helperText={errors.title?.message} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="countMembers"
                control={control}
                rules={{ required: 'تعداد اعضا الزامی است', pattern: { value: /^[0-9]*$/, message: "فقط اعداد مجاز هستند" } }}
                render={({ field }) => (
                  <TextField {...field} label="تعداد اعضا" type="number" variant="outlined" fullWidth margin="normal" error={!!errors.countMembers} helperText={errors.countMembers?.message} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth margin="normal" error={!!errors.termId}>
                <InputLabel id="term-label">ترم</InputLabel>
                <Controller
                  name="termId"
                  control={control}
                  rules={{ required: 'انتخاب ترم الزامی است' }}
                  render={({ field }) => (
                    <Select {...field} label="ترم" labelId="term-label">
                      {terms?.result?.map((term) => (
                        <MenuItem key={term.termId} value={term.termId}>
                          {term.title}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <Controller
                name="teacherId"
                control={control}
                rules={{ required: 'شناسه استاد الزامی است' }}
                render={({ field }) => (
                  <TextField {...field} label="شناسه استاد" variant="outlined" fullWidth margin="normal" error={!!errors.teacherId} helperText={errors.teacherId?.message} />
                )}
              />
            </Grid> */}
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="توضیحات" variant="outlined" fullWidth margin="normal" multiline rows={4} />
                )}
              />
            </Grid>
          
            <Grid item xs={12}>
              <Button type="submit" color="primary" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'ویرایش'}
              </Button>
            </Grid>
          </Grid>
        </form>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={true} pauseOnFocusLoss draggable pauseOnHover />
 </Grid>

  );
  
}

export default EditCourseDialog;
