import { Box, Typography } from "@mui/material";
import { UserProfile } from "@clerk/clerk-react";
import TopNavbar from "../../components/top-navbar";

const SettingsPage = () => {
  return (
    <Box>
      <TopNavbar title="Settings" />

      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          Account Settings
        </Typography>

        <UserProfile
          appearance={{
            elements: {
              rootBox: {
                boxShadow: "none",
                borderRadius: "8px",
                padding: "16px",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default SettingsPage;
