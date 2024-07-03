import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // بررسی می‌کنیم که آیا کاربر توکن دارد یا خیر
    if (!isAuthenticated()) {
      navigate('/account/login');  // اگر توکن ندارد، کاربر را به صفحه ورود هدایت می‌کنیم
    }
    console.log(navigate)
  }, [navigate]);

  // اگر توکن داشته باشد، صفحه داشبورد نمایش داده می‌شود
  return (
    <div>
      Dashboard
    </div>
  );
}

function isAuthenticated() {
  return !!Cookies.get('token');
}

export default Dashboard;
