// src/pages/status-page/public/index.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import publicNetworkService from '../../../utils/publicNetworkService';

const PublicStatusPage = () => {
  const { slug } = useParams();
  const [statusPage, setStatusPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await publicNetworkService.getStatusPageBySlug(slug);
        setStatusPage(data);
      } catch (err) {
        console.error('Failed to load public status page', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!statusPage) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Status page not found.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold">{statusPage.name}</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {statusPage.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {statusPage.domain} | {statusPage.timezone}
        </Typography>
      </Box>

      {statusPage.entries && statusPage.entries.length > 0 ? (
        statusPage.entries.map((entry, index) => (
          <Card
            key={index}
            variant="outlined"
            sx={{
              mb: 2,
              backgroundColor: entry.type === 'incident' ? '#fff3e0' : '#e3f2fd',
            }}
          >
            <CardContent>
              <Typography
                variant="body1"
                color={entry.type === 'incident' ? 'error' : 'primary'}
                fontWeight="medium"
              >
                {entry.type === 'incident' ? '🚨 Incident:' : '📝 Log:'} {entry.message}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(entry.timestamp).toLocaleString()} — {entry.email}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No updates reported yet.</Typography>
      )}
    </Container>
  );
};

export default PublicStatusPage;
