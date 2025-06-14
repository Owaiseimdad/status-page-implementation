import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const GoBackWithConfirm = ({ to = "/", label = "Back", confirmText }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    setOpen(false);
    navigate(to);
  };

  return (
    <>
      <Button variant="outlined" color="secondary" onClick={handleClick}>
        {label}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmText ||
              "Are you sure you want to go back? Any unsaved changes will be lost."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="error" variant="contained">
            Go Back
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GoBackWithConfirm;
