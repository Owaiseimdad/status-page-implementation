// src/components/status-page-option.jsx

import { Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StatusPageOption = ({ page }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/status/${page.id}`);
  };

  return (
    <Paper
      elevation={2}
      onClick={handleClick}
      sx={{
        height: "68px",
        width: "90%",
        mx: "auto",
        px: 3,
        py: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        cursor: "pointer",
        transition: "background-color 0.2s",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
      data-id={page.id}
    >
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {page.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {page.description || "No description provided."}
        </Typography>
      </Box>

      <Box sx={{ textAlign: "right", minWidth: "140px" }}>
        <Typography variant="caption" display="block">
          <strong>Slug:</strong> {page.slug}
        </Typography>
        <Typography variant="caption" display="block">
          <strong>Timezone:</strong> {page.timezone}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatusPageOption;
