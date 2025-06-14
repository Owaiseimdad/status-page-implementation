import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NetworkService from "../../utils/networkService";

const DeleteStatusPageDialog = ({
  open,
  onClose,
  pageId,
  token,
  userId,
}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const networkService = new NetworkService(token);
      await networkService.deleteStatusPage(pageId, userId);
      onClose(); // Close the dialog
      navigate("/"); // Adjust to your actual dashboard or homepage route
    } catch (error) {
      console.error("Failed to delete status page:", error);
      onClose(); // Still close dialog if there's an error, or show an error alert
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this entire status page? This action
          cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteStatusPageDialog;
