import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Container,
  Grid,
  CircularProgress
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/app/AppContext";
import { toast } from "react-toastify";

function Login() {
  const [codeMelli, setCodeMelli] = useState(""); // تغییر از username به codeMelli
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // وضعیت جدید برای نشان دادن ارسال فرم

  const navigate = useNavigate();
  const { setUserInfo } = useAppContext();
  
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); 
    try {
      const response = await fetch("https://assessment.darkube.app/api/Account/Login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          codeMelli: codeMelli, // استفاده از codeMelli به جای username
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      console.log(data)
      if (data?.statusCode==200) {
        if (data?.result?.roleId==1) {
          toast.success(`استاد عزیز جناب آقای ${data?.result?.name} ${data?.result?.family} به سامانه خوش آمدید`)
        }
        else{
          toast.success(`دانشجوی عزیز جناب آقای ${data?.result?.name} ${data?.result?.family} به سامانه خوش آمدید`)
        }
        Cookies.set('token', data?.result?.token, { expires: 7 }); // Set token in cookies with 7 days expiration
       
      }
      else{
        toast.error(data?.message)
      }
      if (rememberMe) {
        localStorage.setItem('codeMelli', codeMelli); // ذخیره codeMelli در localStorage
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('codeMelli'); // حذف codeMelli از localStorage
        localStorage.removeItem('password');
      }
      console.log(data,'data')
      if (data.statusCode==200) {
        setUserInfo(data.result);
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsSubmitting(false); // تنظیم وضعیت ارسال به false
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Container maxWidth="xs" sx={{
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        borderRadius: 4,
        padding: 3,
        marginTop: 8,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        color: "#fff",
      }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <PersonIcon sx={{ color: "deeppink", width: "60px", height: '30px' }} />
        </Box>
        <Box display="flex" alignItems="flex-end" mb={2}>
          <AccountCircleIcon sx={{ color: "white", mr: 1, my: 0.5 }} />
          <TextField
            fullWidth
            value={codeMelli} // تغییر state
            onChange={(e) => setCodeMelli(e.target.value)} // تغییر تابع
            placeholder="کد ملی"
            variant="standard"
            InputProps={{
              style: { color: "#fff", marginRight: '20px' },
            }}
          />
        </Box>
        <Box display="flex" alignItems="flex-end" mb={2}>
          <LockIcon sx={{ color: "white", mr: 1, my: 0.5 }} />
          <TextField
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور"
            type="password"
            variant="standard"
            InputProps={{
              style: { color: "#fff", marginRight: '20px' },
            }}
          />
        </Box>
        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} sx={{ color: "#ff1493" }} />}
          label="من را به خاطر بسپار"
          sx={{ color: "#fff", mb: 2 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#ff1493", ":hover": { backgroundColor: "#ff1493" }, mb: 2 }}
        >
          {isSubmitting ? <CircularProgress size={24}/>:'ورود'}
        </Button>
        <Grid container justifyContent="space-between">
          <Typography variant="body2" sx={{ color: "#fff" }}>
            ثبت نام کنید
          </Typography>
          <Typography variant="body2" sx={{ color: "#fff" }}>
            فراموشی رمز عبور
          </Typography>
        </Grid>
      </Container>
    </form>
  );
}

export default Login;
