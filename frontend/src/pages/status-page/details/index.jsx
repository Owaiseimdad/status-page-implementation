import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { useAuth, useUser } from "@clerk/clerk-react";
import TopNavbar from "../../../components/top-navbar";
import NetworkService from "../../../utils/networkService";

import StatusPageInfo from "../../../components/status-page-info";
import StatusLogEntryCard from "../../../components/status-log-entry-card";
import LogEntryDeleteDialog from "../../../components/log-entry-delete-dialog";
import AddLogEntryDialog from "../../../components/add-log-entry-dialog";
import DeleteStatusPageDialog from "../../../components/delete-status-page-dialog";

const StatusPageDetails = () => {
  const { id: statusPageId } = useParams();
  const { getToken } = useAuth();
  const { user } = useUser();

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

  const [deletePageDialogOpen, setDeletePageDialogOpen] = useState(false);

  const fetchStatusPage = async () => {
    try {
      const token = await getToken();
      setToken(token);
      const networkService = new NetworkService(token);
      const response = await networkService.getStatusPageById(statusPageId);
      setPage(response);
    } catch (error) {
      console.error("Failed to fetch status page:", error);
    } finally {
      setLoading(false);
    }
  };

  const publicLink = `${window.location.origin}/status/public/${page?.slug}`;

const handleCopyLink = async () => {
  try {
    await navigator.clipboard.writeText(publicLink);
    setCopied(true);
  } catch (err) {
    console.error("Copy failed", err);
  }
};

  useEffect(() => {
    if (statusPageId) fetchStatusPage();
  }, [statusPageId]);

  const handleEntryAdded = () => {
    setOpenModal(false);
    fetchStatusPage();
  };

  const handleDeleteClick = (entry) => {
    setEntryToDelete(entry);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const networkService = new NetworkService(token);
      console.log(statusPageId, entryToDelete.id);
      await networkService.deleteLogEntry(statusPageId, entryToDelete.id);
      setDeleteDialogOpen(false);
      fetchStatusPage();
    } catch (error) {
      console.error("Failed to delete entry:", error);
      setDeleteDialogOpen(false);
    }
  };

  if (loading) return <CircularProgress sx={{ m: 2 }} />;
  if (!page)
    return <Typography sx={{ m: 2 }}>Status page not found.</Typography>;

  return (
    <Box>
      <TopNavbar title={`Status Page: ${page.name}`}>
        <Button variant="outlined" onClick={() => setOpenModal(true)}>
          Add Log
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ ml: 2 }}
          onClick={() => setDeletePageDialogOpen(true)}
        >
          Delete
        </Button>
      </TopNavbar>

      <StatusPageInfo page={page} />

      {page.entries?.length > 0 ? (
        page.entries
          .slice()
          .reverse()
          .map((entry, index) => (
            <StatusLogEntryCard
              key={index}
              entry={entry}
              onDelete={handleDeleteClick}
            />
          ))
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
          No log entries yet.
        </Typography>
      )}

      <AddLogEntryDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        token={token}
        user={user}
        statusPageId={statusPageId}
        onEntryAdded={handleEntryAdded}
      />

      <LogEntryDeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <DeleteStatusPageDialog
        open={deletePageDialogOpen}
        onClose={() => setDeletePageDialogOpen(false)}
        pageId={statusPageId}
        token={token}
        userId={user?.id}
      />
    </Box>
  );
};

export default StatusPageDetails;
