import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";

import StatusCreateForm from "../../../components/status-creat-form";
import TopNavbar from "../../../components/top-navbar";
import GoBackWithConfirm from "../../../components/go-back-btn";
import NetworkService from "../../../utils/networkService";

const StatusCreatePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const handleCreateStatusPage = async (formData) => {
    if (!user?.id) {
      console.error("No user ID found.");
      return;
    }

    try {
      const token = await getToken();
      const networkService = new NetworkService(token);

      const payload = {
        ...formData,
        user_id: user.id,
      };

      const result = await networkService.createStatusPage(payload);
      console.log("Created successfully:", result);
      navigate("/status");
    } catch (err) {
      console.error("Status page creation failed:", err);
    }
  };

  return (
    <Box>
      <TopNavbar title="Create Status Page">
        <GoBackWithConfirm to="/status" />
      </TopNavbar>
      <StatusCreateForm onSubmit={handleCreateStatusPage} />
    </Box>
  );
};

export default StatusCreatePage;
