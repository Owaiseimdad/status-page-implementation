import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useState } from "react";
import NetworkService from "../../utils/networkService";

const AddLogEntryForm = ({ statusPageId, user, token, onEntryAdded }) => {
  const [type, setType] = useState("log");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const networkService = new NetworkService(token);
      const payload = {
        type,
        message,
        user_id: user.id,
        email: user.primaryEmailAddress.emailAddress,
      };

      await networkService.addLogEntry(statusPageId, payload);
      setMessage("");
      onEntryAdded?.(); // callback to close and refresh
    } catch (err) {
      alert("Failed to add log/incident entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" gap={2} alignItems="center">
        <Typography variant="body2" sx={{ minWidth: 60 }}>
          Type
        </Typography>
        <Select
          size="small"
          value={type}
          onChange={(e) => setType(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="log">Log</MenuItem>
          <MenuItem value="incident">Incident</MenuItem>
        </Select>
      </Box>

      <TextField
        label="Message"
        multiline
        fullWidth
        minRows={3}
        maxRows={10}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter log or incident message"
        variant="outlined"
      />

      <Box display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !message.trim()}
        >
          {loading ? <CircularProgress size={20} /> : "Add"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddLogEntryForm;
