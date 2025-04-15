import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Alert
} from '@mui/material';
import {
  AccountCircle,
  Edit,
  Save,
  Notifications,
  Security,
  Storage,
  CloudUpload,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [userProfile, setUserProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    affiliation: 'Sample University',
    password: '',
    notifications: {
      emailAlerts: true,
      paperUpdates: true,
      newFeatures: false
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value
    });
  };

  const handleNotificationChange = (setting) => (e) => {
    setUserProfile({
      ...userProfile,
      notifications: {
        ...userProfile.notifications,
        [setting]: e.target.checked
      }
    });
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    setEditMode(false);
    setSuccessMessage('Profile updated successfully!');
    
    // Clear the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Profile
      </Typography>
      
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* User Profile */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5">User Information</Typography>
              <Button 
                variant={editMode ? "contained" : "outlined"}
                color={editMode ? "primary" : "secondary"}
                startIcon={editMode ? <Save /> : <Edit />}
                onClick={() => editMode ? handleSave() : setEditMode(true)}
              >
                {editMode ? 'Save' : 'Edit'}
              </Button>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar
                    sx={{ width: 100, height: 100, mb: 2 }}
                  >
                    {userProfile.firstName.charAt(0)}{userProfile.lastName.charAt(0)}
                  </Avatar>
                  {editMode && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<CloudUpload />}
                    >
                      Upload
                    </Button>
                  )}
                </Box>
              </Grid>
              
              <Grid item xs={12} md={9}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={userProfile.firstName}
                      onChange={handleChange}
                      disabled={!editMode}
                      variant={editMode ? "outlined" : "filled"}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={userProfile.lastName}
                      onChange={handleChange}
                      disabled={!editMode}
                      variant={editMode ? "outlined" : "filled"}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={userProfile.email}
                      onChange={handleChange}
                      disabled={!editMode}
                      variant={editMode ? "outlined" : "filled"}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Affiliation"
                      name="affiliation"
                      value={userProfile.affiliation}
                      onChange={handleChange}
                      disabled={!editMode}
                      variant={editMode ? "outlined" : "filled"}
                      margin="normal"
                      helperText="University, research institution, or company"
                    />
                  </Grid>
                  {editMode && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={userProfile.password}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        helperText="Leave blank to keep current password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleTogglePassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Settings */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Notifications sx={{ mr: 1 }} />
                  Notification Settings
                </Box>
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Email Alerts" 
                    secondary="Receive paper recommendations via email" 
                  />
                  <Switch 
                    edge="end"
                    checked={userProfile.notifications.emailAlerts}
                    onChange={handleNotificationChange('emailAlerts')}
                    disabled={!editMode}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Paper Updates" 
                    secondary="Notifications about updates to papers in your library" 
                  />
                  <Switch 
                    edge="end"
                    checked={userProfile.notifications.paperUpdates}
                    onChange={handleNotificationChange('paperUpdates')}
                    disabled={!editMode}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="New Features" 
                    secondary="Get notified about new app features" 
                  />
                  <Switch 
                    edge="end"
                    checked={userProfile.notifications.newFeatures}
                    onChange={handleNotificationChange('newFeatures')}
                    disabled={!editMode}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Storage sx={{ mr: 1 }} />
                  Storage
                </Box>
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Storage Used
                </Typography>
                <Typography variant="h5">
                  128 MB / 2 GB
                </Typography>
                <Box 
                  sx={{ 
                    mt: 1,
                    height: 10, 
                    bgcolor: '#f0f0f0',
                    borderRadius: 5
                  }}
                >
                  <Box 
                    sx={{ 
                      height: '100%', 
                      width: '6%', 
                      bgcolor: 'primary.main',
                      borderRadius: 5
                    }} 
                  />
                </Box>
              </Box>
              
              <Button 
                variant="outlined" 
                fullWidth
                disabled={!editMode}
              >
                Manage Storage
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile; 