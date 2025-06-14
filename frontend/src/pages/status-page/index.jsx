import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Stack
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";

import TopNavbar from "../../components/top-navbar";
import StatusPageOption from "../../components/status-page-option";
import NetworkService from "../../utils/networkService";

const StatusPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [statusPages, setStatusPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCreate = () => navigate("/status/create");

  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      try {
        const token = await getToken();
        const networkService = new NetworkService(token);
        const data = await networkService.getAllStatusPages(user.id);
        setStatusPages(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, getToken]);

  return (
    <Box>
      <TopNavbar title="Status Page">
        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
      </TopNavbar>

      <Box p={2}>
        {loading ? (
          <CircularProgress />
        ) : statusPages.length === 0 ? (
          <Typography>No status pages found.</Typography>
        ) : (
          <Stack spacing={2}>
            {statusPages.map((page) => (
              <StatusPageOption key={page.id} page={page} />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default StatusPage;
