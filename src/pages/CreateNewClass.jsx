import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress
} from '@mui/material';
import { useAppContext } from '../contexts/app/AppContext'; // مسیر فرضی
import { ToastContainer, toast } from 'react-toastify';
function CreateNewClass() {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      teacherId: '',
      termId: '',
      title: '',
      description: '',
      countMembers: ''
    }
  });

  const { userInfo } = useAppContext(); // دسترسی به اطلاعات کاربر و توکن
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://assessment.darkube.app/api/Course/Terms')
      .then(response => response.json())
      .then(data => setTerms(data))
      .catch(error => {
        toast.error('خطا در دریافت اطلاعات ترم: ' + error.message);
      });
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('https://assessment.darkube.app/api/Course/CreateCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.token}` // ارسال توکن برای احراز هویت
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (response.ok) {
        toast.success('کلاس با موفقیت ایجاد شد!');
        reset();
      } else {
        toast.error('خطا در ایجاد کلاس: ' + result.message);
      }
    } catch (error) {
      toast.error('خطا در ایجاد کلاس: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ direction: 'rtl', padding: '20px' }}>
      <Grid item xs={12} md={7} borderRadius={2} sx={{
        boxShadow:' rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;'
      }}>
       <Grid  p={2} borderRadius={2} display={'flex'}justifyContent={'center'}>
       <Typography variant="p" fontFamily={'iran-sans'} color={'Gray'} fontSize={'14px'}  textAlign={'center'}>سلام و خیر مقدم خدمت شما استاد عزیز,جناب آقای {userInfo?.name} {userInfo?.family} لطفا تمامی فیلد هارو برای ساختن کلاس مربوطه پر کنید</Typography>
       </Grid>
        <form onSubmit={handleSubmit(onSubmit)} noValidate style={{padding:'10px'}}>
        <Grid display={'flex'} flexDirection={{xs:'column',sm:'row'}} gap={2}>
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
          <Controller
            name="teacherId"
            control={control}
            rules={{ required: 'شناسه استاد الزامی است' }}
            render={({ field }) => (
              <TextField {...field} placeholder="شناسه استاد" variant="outlined" fullWidth margin="normal" error={!!errors.teacherId} helperText={errors.teacherId?.message} />
            )}
          />
        </Grid>
        <Grid display={'flex'} flexDirection={{xs:'column',sm:'row'}} gap={2}>
        <Controller
            name="title"
            control={control}
            rules={{ required: 'عنوان کلاس الزامی است' }}
            render={({ field }) => (
              <TextField {...field} placeholder="عنوان" variant="outlined" fullWidth margin="normal" error={!!errors.title} helperText={errors.title?.message} />
            )}
          />
            <Controller
            name="countMembers"
            control={control}
            rules={{ required: 'تعداد اعضا الزامی است', pattern: { value: /^[0-9]*$/, message: "فقط اعداد مجاز هستند" } }}
            render={({ field }) => (
              <TextField {...field} placeholder="تعداد اعضا" variant="outlined" fullWidth margin="normal" error={!!errors.countMembers} helperText={errors.countMembers?.message} />
            )}
          />
        </Grid>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField {...field} placeholder="توضیحات" variant="outlined" fullWidth margin="normal" multiline rows={4} />
            )}
          />
        
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, fontFamily: 'iran-sans' }} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'ایجاد کلاس'}
          </Button>
        </form>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={true} pauseOnFocusLoss draggable pauseOnHover />
      </Grid>
    </Grid>
  );
}

export default CreateNewClass;
