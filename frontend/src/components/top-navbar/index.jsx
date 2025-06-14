import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";

const TopNavbar = ({ title, children }) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      color="default"
      sx={{
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#fff",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Box display="flex" gap={1}>
          {children}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
