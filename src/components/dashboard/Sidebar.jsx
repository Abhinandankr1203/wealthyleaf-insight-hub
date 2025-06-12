import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Avatar,
  Stack,
  AppBar,
  Toolbar,
  Collapse,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FlagIcon from '@mui/icons-material/Flag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FolderIcon from '@mui/icons-material/Folder';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SecurityIcon from '@mui/icons-material/Security';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../context/AuthContext';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PeopleIcon from '@mui/icons-material/People';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from '../../theme';

const SIDEBAR_WIDTH = 240;

// User Sidebar Items
const userPlatformItems = [
  { text: 'Dashboard', icon: <HomeIcon />, link: '/dashboard' },
  { text: 'Report', icon: <AssessmentIcon />, link: '/dashboard/report' },
  { text: 'Transactions', icon: <ReceiptLongIcon />, link: '/dashboard/transactions' },
  { text: 'Insurance', icon: <LocalHospitalIcon />, link: '/dashboard/insurance' },
  { text: 'My SIPs', icon: <WatchLaterIcon />, link: '/dashboard/sips' },
  { text: 'My Folios', icon: <PlaylistAddCheckIcon />, link: '/dashboard/folios' },
  { text: 'Goal Planner', icon: <FlagIcon />, link: '/dashboard/goal-planner' },
  { text: 'Invest Online NSE', icon: <TrendingUpIcon />, subItems: [
      { text: 'New Investment', link: '/dashboard/invest-nse/new' },
      { text: 'Fund Picks', link: '/dashboard/invest-nse/fund-picks' },
      { text: 'Additional Transaction', link: '/dashboard/invest-nse/additional' },
      { text: 'Cart', link: '/dashboard/invest-nse/cart' },
      { text: 'My Orders', link: '/dashboard/invest-nse/orders' },
      { text: 'Manage Profiles', link: '/dashboard/invest-nse/profiles' },
    ]
  },
  { text: 'Invest Online MFU', icon: <MenuBookIcon />, subItems: [
      { text: 'New Investment', link: '/dashboard/invest-mfu/new' },
      { text: 'Fund Picks', link: '/dashboard/invest-mfu/fund-picks' },
      { text: 'Additional Transaction', link: '/dashboard/invest-mfu/additional' },
      { text: 'Cart', link: '/dashboard/invest-mfu/cart' },
      { text: 'My Orders', link: '/dashboard/invest-mfu/orders' },
      { text: 'Manage Profiles', link: '/dashboard/invest-mfu/profiles' },
    ]
  },
  { text: 'My Documents', icon: <FolderIcon />, link: '/dashboard/documents' },
  { text: 'Risk Profiling', icon: <SecurityIcon />, link: '/dashboard/risk-profiling' },
  { text: 'Watchlist', icon: <ListAltIcon />, link: '/dashboard/watchlist' },
];

// Admin Sidebar Items
const adminPlatformItems = [
  { text: 'Dashboard', icon: <HomeIcon />, link: '/dashboard' },
  { text: 'Clients', icon: <PeopleIcon />, link: '/dashboard/clients' },
  { text: 'Folio Lookup', icon: <PlaylistAddCheckIcon />, link: '/dashboard/folio-lookup' },
  { text: 'Invest Online NSE', icon: <TrendingUpIcon />, subItems: [
      { text: 'New Investment', link: '/dashboard/invest-nse/new' },
      { text: 'Fund Picks', link: '/dashboard/invest-nse/fund-picks' },
      { text: 'Additional Transaction', link: '/dashboard/invest-nse/additional' },
      { text: 'Cart', link: '/dashboard/invest-nse/cart' },
      { text: 'My Orders', link: '/dashboard/invest-nse/orders' },
      { text: 'Manage Profiles', link: '/dashboard/invest-nse/profiles' },
    ]
  },
  { text: 'Invest Online MFU', icon: <MenuBookIcon />, subItems: [
      { text: 'New Investment', link: '/dashboard/invest-mfu/new' },
      { text: 'Fund Picks', link: '/dashboard/invest-mfu/fund-picks' },
      { text: 'Additional Transaction', link: '/dashboard/invest-mfu/additional' },
      { text: 'Cart', link: '/dashboard/invest-mfu/cart' },
      { text: 'My Orders', link: '/dashboard/invest-mfu/orders' },
      { text: 'Manage Profiles', link: '/dashboard/invest-mfu/profiles' },
    ]
  },
  { text: 'Utilities', icon: <SettingsIcon />, link: '/dashboard/utilities' },
  { text: 'Transactions View', icon: <ReceiptLongIcon />, link: '/dashboard/transactions-view' },
  { text: 'Insurance', icon: <LocalHospitalIcon />, link: '/dashboard/insurance' },
  { text: 'Business Analytics', icon: <AssessmentIcon />, link: '/dashboard/business-analytics' },
  { text: 'Data Management', icon: <InsertDriveFileIcon />, link: '/dashboard/data-management' },
  { text: 'Comprehensive', icon: <AssignmentIndIcon />, link: '/dashboard/comprehensive' },
];

const accountItems = [
  { text: 'Profile', icon: <AccountCircleIcon />, link: '/dashboard/profile' },
  { text: 'Account Settings', icon: <ManageAccountsIcon />, link: '/dashboard/account-settings' },
];

const supportItems = [
  { text: 'Support', icon: <SupportAgentIcon />, link: '/dashboard/support' },
  { text: 'Feedback', icon: <FeedbackIcon />, link: '/dashboard/feedback' },
];

function SidebarContent() {
  const { role, user, logout } = useAuth();
  const [openNSE, setOpenNSE] = React.useState(false);
  const [openMFU, setOpenMFU] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      // You can show a toast/snackbar here if you want
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  // Choose menu based on role
  const platformItems = role === 'admin' ? adminPlatformItems : userPlatformItems;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box>
        {/* Logo and Brand */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ p: 2, pb: 1 }}>
          <Avatar sx={{ bgcolor: 'orange', width: 36, height: 36, fontWeight: 700 }}>WL</Avatar>
          <Typography variant="h6" fontWeight={700} color="#fff" letterSpacing={1}>
            WealthyLeaf
          </Typography>
        </Stack>
        <Divider sx={{ bgcolor: '#23272f', mb: 1 }} />

        {/* PLATFORM Section */}
        <Typography variant="caption" sx={{ pl: 3, color: '#b0b8c1', fontWeight: 700, letterSpacing: 1 }}>
          PLATFORM
        </Typography>
        <List dense>
          {platformItems.map((item) => {
            if (item.subItems) {
              const isNSE = item.text === 'Invest Online NSE';
              const open = isNSE ? openNSE : openMFU;
              const setOpen = isNSE ? setOpenNSE : setOpenMFU;
              return (
                <React.Fragment key={item.text}>
                  <ListItem button onClick={() => setOpen(!open)} sx={{ color: '#fff', mx: 1, borderRadius: 1 }}>
                    <ListItemIcon sx={{ color: '#b0b8c1', minWidth: 36 }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map(sub => (
                        <ListItem
                          button
                          key={sub.text}
                          component={Link}
                          to={sub.link}
                          sx={{ color: '#b0b8c1', pl: 6, borderRadius: 1, mx: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.08)', color: '#fff' } }}
                        >
                          <ListItemText primary={sub.text} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            }
            return (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.link}
                sx={{
                  color: '#fff',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                  borderRadius: 1,
                  mx: 1,
                }}
              >
                <ListItemIcon sx={{ color: '#b0b8c1', minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
        </List>

        {/* ACCOUNT Section */}
        <Typography variant="caption" sx={{ pl: 3, color: '#b0b8c1', fontWeight: 700, letterSpacing: 1, mt: 2 }}>
          ACCOUNT
        </Typography>
        <List dense>
          {accountItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.link}
              sx={{
                color: '#fff',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                borderRadius: 1,
                mx: 1,
              }}
            >
              <ListItemIcon sx={{ color: '#b0b8c1', minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ mb: 2 }}>
        <Divider sx={{ bgcolor: '#23272f', mb: 1 }} />
        <List dense>
          {supportItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.link}
              sx={{
                color: '#b0b8c1',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)', color: '#fff' },
                borderRadius: 1,
                mx: 1,
              }}
            >
              <ListItemIcon sx={{ color: '#b0b8c1', minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem
            button
            key="Logout"
            onClick={handleLogout}
            sx={{
              color: '#b0b8c1',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.08)', color: '#fff' },
              borderRadius: 1,
              mx: 1,
            }}
          >
            <ListItemIcon sx={{ color: '#b0b8c1', minWidth: 36 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
        {/* User Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, mt: 2 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: '#23272f', fontSize: 16 }}>
            {user?.email ? user.email[0].toUpperCase() : 'U'}
          </Avatar>
          <Box sx={{ ml: 1 }}>
            <Typography variant="body2" color="#fff" fontWeight={700}>
              {user?.displayName || user?.email?.split('@')[0] || 'User'}
            </Typography>
            <Typography variant="caption" color="#b0b8c1">
              {user?.email || ''}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {/* AppBar for mobile */}
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, bgcolor: 'rgba(24,28,35,0.92)' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              WealthyLeaf
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      {/* Permanent drawer for desktop, temporary for mobile */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        anchor="left"
        PaperProps={{
          sx: {
            width: SIDEBAR_WIDTH,
            bgcolor: 'rgba(24,28,35,0.92)',
            color: '#fff',
            borderRight: 0,
            boxShadow: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    </>
  );
}