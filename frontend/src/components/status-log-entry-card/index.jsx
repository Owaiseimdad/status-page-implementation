import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const StatusLogEntryCard = ({ entry, onDelete }) => (
  <Box
    sx={{
      mb: 2,
      p: 2,
      borderRadius: 2,
      backgroundColor: entry.type === "incident" ? "#fdecea" : "#f9f9f9",
      border: entry.type === "incident" ? "1px solid #f44336" : "1px solid #e0e0e0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Box>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
        {entry.type === "incident" ? "🚨 Incident" : "📄 Log"} by {entry.email} · {new Date(entry.timestamp).toLocaleString()}
      </Typography>
      <Typography variant="body1">{entry.message}</Typography>
    </Box>
    <IconButton color="error" onClick={() => onDelete(entry)}>
      <DeleteIcon />
    </IconButton>
  </Box>
);

export default StatusLogEntryCard;
