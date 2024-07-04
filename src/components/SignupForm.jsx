import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
  Box,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  CircularProgress,
  IconButton,
} from "@mui/material";
import {
  AccountCircle,
  Lock,
  Phone,
  PersonAdd,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../assets/style/SignupForm.module.css";
import { useNavigate } from "react-router-dom";

function SignupForm({ onCancel, type, roleId }) {
  const [showPassword, setShowPassword] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    family: "",
    phoneNumber: "",
    email: "",
    password: "",
    rePassword: "",
    codeMelli: "",
    teacherCode: "",
    gradeId: "",
    roleId: roleId,
  });
  const [errors, setErrors] = useState({});
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (type === "دانشجو") {
      setLoading(true);
      fetch(`${BASE_URL}/Grade/GetAllGrade`)
        .then((res) => res.json())
        .then((data) => {
          setOptions(data.result);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching grades:", err);
          setLoading(false);
        });
    }
  }, [type, BASE_URL]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const apiUrl =
      type === "استاد"
        ? "/Account/RegisterTeacher"
        : "/Account/RegisterStudent";
    const payload = preparePayload();

    fetch(`${BASE_URL}${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
        if (data.statusCode == 200) {
          toast.success("ثبت نام شما باموفقیت انجام شد");
          navigate("/account/login");
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error("ثبت نام انجام نشد");
        console.error("Error:", error);
      });
  };

  const validateForm = () => {
    const newErrors = {};
    [
      "name",
      "family",
      "phoneNumber",
      "email",
      "password",
      "rePassword",
      "codeMelli",
    ].forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = `لطفا ${field} را پر کنید`;
      }
    });

    if (formData.password !== formData.rePassword) {
      newErrors.password = "پسوردها مطابقت ندارند";
      newErrors.rePassword = "پسوردها مطابقت ندارند";
    }

    if (type === "استاد" && !formData.teacherCode.trim()) {
      newErrors.teacherCode = "لطفا کد استاد را پر کنید";
    }

    if (type === "دانشجو" && !formData.gradeId) {
      newErrors.gradeId = "لطفا پایه تحصیلی را انتخاب کنید";
    }

    return newErrors;
  };

  const preparePayload = () => {
    const { teacherCode, gradeId, ...rest } = formData;
    return type === "استاد"
      ? { ...rest, teacherCode }
      : { ...rest, gradeId: parseInt(gradeId) };
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData((prev) => ({ ...prev, gradeId: event.target.value })); // بروزرسانی formData.gradeId

    if (errors.selectedOption) {
      setErrors((prev) => ({ ...prev, selectedOption: null }));
    }
  };
  console.log(formData, "formData");
  return (
    <form onSubmit={handleSubmit}>
      <Box className={styles.signupCard} sx={{ padding: 3 }} >
        <Grid
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"space-between"}
          height={"100%"}
        >
          <Grid
            item
            xs={12}
            my={4}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <AccountCircle fontSize="40px" />

            <Typography fontFamily={"iran-sans"} color={"#fff"} mt={2}>
              ثبت نام {type === "استاد" ? "استاد" : "دانشجو"}
            </Typography>
          </Grid>
          <Grid item xs={12} display={"flex"} gap={"30px"}>
            <TextField
              fullWidth
              variant="standard"
              name="name"
              label="نام"
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              fullWidth
              variant="standard"
              name="family"
              label="نام خانوادگی"
              value={formData.family}
              onChange={handleInputChange}
              error={!!errors.family}
              helperText={errors.family}
            />
          </Grid>

          <Grid item xs={12} display={"flex"} gap={"30px"}>
            <TextField
              fullWidth
              variant="standard"
              name="phoneNumber"
              label="شماره تلفن"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
            <TextField
              fullWidth
              variant="standard"
              name="email"
              label="ایمیل"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12} display={"flex"} gap={"30px"}>
            <TextField
              fullWidth
              variant="standard"
              name="password"
              label="رمز عبور"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              variant="standard"
              name="rePassword"
              label="تکرار رمز عبور"
              type={showPassword ? "text" : "password"}
              value={formData.rePassword}
              onChange={handleInputChange}
              error={!!errors.rePassword}
              helperText={errors.rePassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} display={"flex"} gap={"30px"}>
            <TextField
              fullWidth
              variant="standard"
              name="codeMelli"
              label="کد ملی"
              value={formData.codeMelli}
              onChange={handleInputChange}
              error={!!errors.codeMelli}
              helperText={errors.codeMelli}
            />
            {type === "استاد" && (
              // <Grid item xs={12}>
              <TextField
                fullWidth
                variant="standard"
                name="teacherCode"
                label="کد استاد"
                value={formData.teacherCode}
                onChange={handleInputChange}
                error={!!errors.teacherCode}
                helperText={errors.teacherCode}
              />
            )}
            {type === "دانشجو" && (
              <>
                {" "}
                {type === "دانشجو" && loading ? (
                  <FormControl fullWidth variant="standard">
                    <InputLabel style={{ color: "#fff" }}>
                      انتخاب گزینه
                    </InputLabel>
                    <Select
                      value={selectedOption}
                      onChange={handleSelectChange}
                      label="انتخاب گزینه"
                      style={{ color: "#fff" }}
                      inputProps={{ style: { color: "#fff" } }}
                    >
                      <CircularProgress color="inherit" />
                    </Select>
                  </FormControl>
                ) : (
                  <FormControl fullWidth variant="standard">
                    <InputLabel style={{ color: "#fff" }}>
                      انتخاب گزینه
                    </InputLabel>
                    <Select
                      value={selectedOption}
                      onChange={handleSelectChange}
                      label="انتخاب گزینه"
                      style={{ color: "#fff" }}
                      inputProps={{ style: { color: "#fff" } }}
                    >
                      {options.map((option) => (
                        <MenuItem key={option.gradeId} value={option.gradeId}>
                          {option.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </>
            )}
          </Grid>

          <Grid display={"flex"} justifyContent={'space-between'} gap={1} item xs={12}>
            <Grid item xs={6} width={'50%'}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                style={{ backgroundColor: "hotpink", color: "#fff" }}
              >
                ثبت نام
              </Button>
            </Grid>
            <Grid item xs={6} width={'50%'}>
              <Button
                onClick={onCancel}
                variant="contained"
                fullWidth
                style={{ backgroundColor: "#90a4ae", color: "#fff" }}
              >
                انصراف
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default SignupForm;
