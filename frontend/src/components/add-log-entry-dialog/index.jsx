import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import AddLogEntryForm from "../add-log-entry-form";

const AddLogEntryDialog = ({ open, onClose, token, user, statusPageId, onEntryAdded }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Add Log Entry</DialogTitle>
    <DialogContent dividers>
      {token && user && (
        <AddLogEntryForm
          statusPageId={statusPageId}
          user={user}
          token={token}
          onEntryAdded={onEntryAdded}
        />
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="secondary">Cancel</Button>
    </DialogActions>
  </Dialog>
);

export default AddLogEntryDialog;
