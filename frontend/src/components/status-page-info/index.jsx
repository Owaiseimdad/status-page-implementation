import { Box, Typography } from "@mui/material";

const StatusPageInfo = ({ page }) => (
  <Box p={2}>
    <Typography variant="h4" gutterBottom>{page.name}</Typography>
    <Typography variant="subtitle1" color="text.secondary">
      {page.description || "No description provided."}
    </Typography>
    <Typography variant="body2" sx={{ mt: 2 }}><strong>Domain:</strong> {page.domain || "—"}</Typography>
    <Typography variant="body2"><strong>Slug:</strong> {page.slug}</Typography>
    <Typography variant="body2"><strong>Timezone:</strong> {page.timezone}</Typography>
  </Box>
);

export default StatusPageInfo;
