import Cookies from 'js-cookie';

export default function isAuthenticated() {
  return !!Cookies.get('token');  // بررسی می‌کند که آیا توکن در کوکی‌ها وجود دارد
}
