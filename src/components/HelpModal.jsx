import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from "@mui/material";

const HelpModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>راهنما</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          وضعیت انتشار تمرین
          در صورتی که تمرین در حالت «پیش‌نویس» باشد، دانشجویان تمرین را نمی‌بینند و دستیاران آموزشی می‌توانند به طراحی تمرین و آپلود تست‌کیس‌ها و تست تمرین بپردازند. هنگامی که تست تمرین تمام شد، برای اینکه دانشجویان تمرین را ببینند، تمرین را منتشر کنید.
        </Typography>
        <Typography gutterBottom>
          زمان شروع
          قبل از زمان شروع، دانشجویان نمی‌توانند وارد تمرین شوند و سؤالات را ببینند.
        </Typography>
        <Typography gutterBottom>
          فعال بودن جدول امتیازات
          در صورتی که جدول امتیازات فعال باشد، نمرات ارسال‌های نهایی در جدول امتیازات به همه‌ی دانشجویان نمایش داده می‌شود.
        </Typography>
        <Typography gutterBottom>
          فایل PDF تمرین
          شما می‌توانید صورت سؤالات تمرین را از طریق فایل PDF در اختیار دانشجویان قرار دهید. همچنین می‌توانید به جای قرار دادن فایل PDF، صورت سؤال‌ها را هنگام افزودن سؤال بنویسید. توصیه‌ی ما روش دوم است.
        </Typography>
        <Typography gutterBottom>
          قاعده‌ی اعمال جریمه
          اگر می‌خواهید تمرین پس از زمان پایان بسته نشود و همچنان امکان ارسال پاسخ‌ها با اعمال جریمه وجود داشته باشد، می‌توانید از این قسمت استفاده کنید. قاعده‌ی اعمال جریمه، تابعی از میزان تأخیر به ثانیه (متغیر delay) است. خروجی این تابع، عددی است در بازه ۰ تا ۱۰۰ که درصدی که قرار است در نمره ضرب شود را نشان می‌دهد. مثالی از تعریف این تابع:
        </Typography>
        <Typography gutterBottom>
          1h 100-((30*delay)/3600)
          1d 70
          2d 50
          در این مثال، امکان ارسال با تأخیر تا ۲ روز وجود دارد.
          در یک ساعت اول، خروجی با فرمول 100-((30*delay)/3600) (تابعی خطی از ۱۰۰ تا ۷۰) تعیین می‌شود. برای تأخیر بین ۱ ساعت تا ۱ روز، خروجی ۷۰٪ و برای تأخیر بین ۱ روز تا ۲ روز، خروجی ۵۰٪ خواهد بود.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpModal;
