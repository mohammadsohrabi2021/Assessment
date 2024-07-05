import React from "react";
import {
  Grid,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  Box,
} from "@mui/material";
import {
  Telegram,
  WhatsApp,
  Facebook,
  Twitter,
  ContentCopy,
  Close,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModaleShareLink({ open, onClose, copyLinkCourse }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(`https://assessment-front.darkube.app/${copyLinkCourse?.link}`);
    toast.success("URL شما با موفقیت کپی شد!");
  };
  console.log(copyLinkCourse);
  const shareOptions = [
    {
      icon: <Telegram />,
      label: "Telegram",
      url: `https://t.me/share/url?url=${encodeURIComponent(copyLinkCourse)}`,
    },
    {
      icon: <WhatsApp />,
      label: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        copyLinkCourse
      )}`,
    },
    {
      icon: <Facebook />,
      label: "Messenger",
      url: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
        copyLinkCourse
      )}`,
    },
    {
      icon: <Twitter />,
      label: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        copyLinkCourse
      )}`,
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <ToastContainer />
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between"}}>
        <Typography fontFamily={"iran-sans"}> اشتراک‌گذاری لینک</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box my={2} textAlign="center">
          <Typography variant="body1" mb={2} fontFamily={'iran-sans'} color={'gray'}>
           شما میتوانید لینک ورود به کلاس رو در زیر به چندین روش کپی کنید 
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={2}
            bgcolor={'lightGray'}
            borderRadius={'50px'}
            color={'#fff'}
          >
            <Typography
              variant="body2"
              sx={{ wordWrap: "break-word", marginRight: 1 }}
            >
              https://assessment-front.darkube.app/course/JoinClass/{copyLinkCourse?.link}
            </Typography>
            <Tooltip title="کپی لینک" >
              <IconButton onClick={handleCopy}>
                <ContentCopy />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="body1" mb={2}>
            اشتراک‌گذاری در:
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {shareOptions.map((option, index) => (
              <Grid item key={index}>
                <Tooltip title={option.label}>
                  <IconButton
                    component="a"
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {option.icon}
                  </IconButton>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ModaleShareLink;
