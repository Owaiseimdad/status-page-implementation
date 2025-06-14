import React from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';

const SlideFromTopLeft = (props) => {
  return <Slide {...props} direction="down" />;
};

const NotificationSlider = ({ open, onClose, message, type = "info", duration = 3000 }) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={duration}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      TransitionComponent={SlideFromTopLeft}
      sx={{ top: 10 }}
    >
      <Alert
        onClose={onClose}
        severity={type}
        variant="filled"
        sx={{
          width: '100%',
          height: 35,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          px: 2,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSlider;
