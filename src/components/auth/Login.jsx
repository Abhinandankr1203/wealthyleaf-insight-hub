import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
  Box,
  Avatar,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password || !role) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const success = await login(email, password, role);
      if (success) {
        // Redirect based on role
        switch (role) {
          case 'investor':
            navigate('/dashboard/investor');
            break;
          case 'sub-broker':
            navigate('/dashboard/sub-broker');
            break;
          case 'admin':
            navigate('/dashboard/admin');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        setError('Invalid credentials. Please check your email, password, and role.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: 'linear-gradient(135deg, #0f172a 0%, #0e7490 50%, #6366f1 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: { xs: 2, sm: 5 },
          width: '100%',
          maxWidth: 400,
          borderRadius: 6,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
          backdropFilter: 'blur(8px)',
          background: 'rgba(255,255,255,0.85)',
          zIndex: 1,
        }}
      >
        <Stack alignItems="center" spacing={2} mb={3}>
          <img src="/logo.svg" alt="Wealthyleaf Logo" style={{ width: 48, height: 48, marginBottom: 4 }} />
          <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, boxShadow: 3 }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" fontWeight={800} color="primary.main">
            Wealthyleaf
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>
            Secure Login Portal
          </Typography>
        </Stack>

        {/* Demo Credentials Info */}
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2" fontWeight={600}>
            Demo Credentials:
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Investor:</strong> investor@wealthyleaf.com / password123<br/>
            <strong>Sub-Broker:</strong> broker@wealthyleaf.com / password123<br/>
            <strong>Admin:</strong> admin@wealthyleaf.com / password123
          </Typography>
        </Alert>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
            autoComplete="username"
            size="medium"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
            autoComplete="current-password"
            size="medium"
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="investor">Investor</MenuItem>
              <MenuItem value="sub-broker">Sub-Broker</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{
              mt: 2,
              py: 1.2,
              fontWeight: 700,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              borderRadius: 2,
              letterSpacing: 1,
              boxShadow: 2,
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }} role="alert">
            {error}
          </Alert>
        )}

        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Don't have an account?{' '}
            <a
              href="/signup"
              style={{
                color: '#1976d2',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Sign up
            </a>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}