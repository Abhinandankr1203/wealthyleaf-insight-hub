import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../context/AuthContext';

const SIDEBAR_WIDTH = 240;

export default function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { role } = useAuth();
  console.log("role is ..>",role);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box
        sx={{
          mt: isMobile ? 7 : 0,
          ml: isMobile ? 0 : `${SIDEBAR_WIDTH}px`,
          pt: isMobile ? 7 : 0,
          p: 3,
          minHeight: '100vh',
          width: isMobile ? '100vw' : `calc(100vw - ${SIDEBAR_WIDTH}px)`,
          background: 'none',
          color: '#222',
          boxSizing: 'border-box',
          transition: 'margin .3s,width .3s',
        }}
      >
        <Typography variant="h4">
          {role === 'admin'
            ? 'Welcome Admin! Here is your admin dashboard.'
            : 'Welcome User! Here is your user dashboard.'}
        </Typography>
        {/* Add more role-specific content here */}
      </Box>
    </>
  );
}