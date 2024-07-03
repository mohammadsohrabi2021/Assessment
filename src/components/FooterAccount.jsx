import React from 'react';
import { Grid, Typography, Link } from '@mui/material';

function FooterAccount() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        backgroundColor: '#1a1a1a',
        backgroundImage: 'url(https://example.com/background.png)', // جایگزین با آدرس تصویر زمینه واقعی
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px 0',
        color: '#ffffff',
      }}
    >
      <Typography variant="body2" style={{ color: '#ffffff' }}>
        کلیه حقوق این سایت متعلق به 
        <Link href="https://mohammadsohrabi.ir/" style={{ color: '#00bfff' }}>
          {' '}mohammadsohrabi.ir{' '}
        </Link>
        می‌باشد
      </Typography>
    </Grid>
  );
}

export default FooterAccount;
