import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import dataBoxRegister from "../data/dataBoxRegister";
import SignupForm from "../components/SignupForm";

function Register() {
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [roles, setRoles] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    // جایگزین نمودن نشانی API واقعی
    fetch(`${BASE_URL}/Account/GetRoles`)
      .then(response => response.json())
      .then(data => {
        setRoles(data.result);
      })
      .catch(error => console.error('Error fetching roles:', error));
  }, []);
console.log(roles,'roles')
const handleBoxClick = (item) => {
  const role = roles.find(role => role.title === item.title);

  if (role) {
    setSelectedType({ type: item.title, roleId: role.roleId });
    setShowForm(true);
  } else {
    console.log("Role not found for:", item.title); // اضافه کردن لاگ برای تشخیص مشکل
  }
};

  const handleCancel = () => {
    setShowForm(false);
    setSelectedType(null);
  };
  console.log(selectedType,'selectedType.type')

  return (
    <Grid id="root">
      {!showForm ? (
        <Grid className="container">
          <Typography fontFamily={"iran-sans"} fontSize={"24px"}>
            انتخاب کنید:
          </Typography>
          <Grid container justifyContent="center">
            {dataBoxRegister.map((item, index) => (
              <Box key={index} className="card" onClick={()=>handleBoxClick(item)}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "100px", marginBottom: "10px" }}
                />

                <Typography
                  fontFamily={"iran-sans"}
                  color={"#03A9F4 "}
                  variant="h6"
                  gutterBottom
                >
                  {item.title}
                </Typography>
                <Grid border={"1px solid gray"} my={2} />
                <Typography
                  fontFamily={"iran-sans"}
                  fontSize={"14px"}
                  lineHeight={"30px"}
                >
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
      ) : (
        <SignupForm onCancel={handleCancel} type={selectedType?.type} roleId={selectedType?.roleId}/>
      )}
    </Grid>
  );
}

export default Register;
