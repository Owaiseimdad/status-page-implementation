import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
} from "@mui/material";
import { ContentCopy } from "@mui/icons-material";

const StatusPageInfo = ({ page }) => {
  const [copied, setCopied] = useState(false);
  const publicLink = `${window.location.origin}/status/public/${page.slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicLink);
      setCopied(true);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>{page.name}</Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {page.description || "No description provided."}
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        <strong>Domain:</strong> {page.domain || "—"}
      </Typography>
      <Typography variant="body2">
        <strong>Slug:</strong> {page.slug}
      </Typography>
      <Typography variant="body2">
        <strong>Timezone:</strong> {page.timezone}
      </Typography>

      {/* Public link with copy button */}
      <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
        <Typography variant="body2">
          <strong>Public Link:</strong>
        </Typography>
        <Typography
          variant="body2"
          sx={{ wordBreak: "break-all", color: "primary.main" }}
        >
          {publicLink}
        </Typography>
        <Tooltip title="Copy to clipboard">
          <IconButton size="small" onClick={handleCopyLink}>
            <ContentCopy fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Link copied to clipboard!"
      />
    </Box>
  );
};

export default StatusPageInfo;
