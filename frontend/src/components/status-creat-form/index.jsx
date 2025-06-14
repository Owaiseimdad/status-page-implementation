import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const StatusCreateForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    domain: '',
    timezone: 'UTC',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSlugTouched, setIsSlugTouched] = useState(false); // Track manual slug edits

  const handleChange = (field) => (event) => {
    const value = event.target.value;

    setFormData(prev => {
      let updated = { ...prev, [field]: value };

      // Auto-generate slug only if user hasn't manually edited it
      if (field === 'name' && !isSlugTouched) {
        const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        updated.slug = slug;
      }

      return updated;
    });

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSlugChange = (event) => {
    const value = event.target.value;
    setIsSlugTouched(true); // User manually edited slug
    setFormData(prev => ({ ...prev, slug: value }));

    if (errors.slug) {
      setErrors(prev => ({ ...prev, slug: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Organization name is required';
    if (!formData.slug.trim()) newErrors.slug = 'URL slug is required';
    if (formData.slug.length < 3) newErrors.slug = 'URL slug must be at least 3 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSubmit?.(formData);
    } catch (error) {
      console.error('Failed to submit status page:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create Your Status Page
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Set up a status page to communicate service availability to your users
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Services Name"
            value={formData.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            helperText={errors.name || 'The name of your organization or service'}
            placeholder="e.g., API services"
            fullWidth
          />

          <TextField
            label="Custom Domain"
            value={formData.domain}
            onChange={handleChange('domain')}
            helperText="e.g., status.yourcompany.com"
            placeholder="status.yourcompany.com"
            fullWidth
          />

          <TextField
            label="URL Slug"
            value={formData.slug}
            onChange={handleSlugChange}
            onFocus={() => setIsSlugTouched(true)}
            error={!!errors.slug}
            helperText={errors.slug || 'This will be your status page URL'}
            placeholder="e.g., apiservice789"
            fullWidth
          />

          <TextField
            label="Description"
            value={formData.description}
            onChange={handleChange('description')}
            multiline
            rows={3}
            helperText="Brief description of your organization (optional)"
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Timezone</InputLabel>
            <Select
              value={formData.timezone}
              onChange={handleChange('timezone')}
              label="Timezone"
            >
              <MenuItem value="UTC">UTC</MenuItem>
              <MenuItem value="America/New_York">Eastern Time</MenuItem>
              <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
              <MenuItem value="Europe/London">London</MenuItem>
              <MenuItem value="Asia/Kolkata">India Standard Time</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Status Page'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default StatusCreateForm;
