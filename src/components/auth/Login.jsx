import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
  Box,
  Avatar,
  Stack,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Add this line

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: 'none', // Removed background color/gradient
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Accent */}
      <Box
        sx={{
          display: 'none', // Hide decorative accent as well
        }}
      />
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
          <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, boxShadow: 3 }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" fontWeight={800} color="primary.main">
            WealthyLeaf
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>
            Secure Login Portal
          </Typography>
        </Stack>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
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
            Login
          </Button>
        </form>
        <Divider sx={{ my: 3, fontWeight: 600 }}>or</Divider>
        <Button
          onClick={handleGoogleLogin}
          variant="outlined"
          fullWidth
          startIcon={
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              style={{ width: 22, height: 22 }}
            />
          }
          sx={{
            py: 1.2,
            fontWeight: 700,
            fontSize: { xs: '0.95rem', sm: '1.1rem' },
            borderColor: '#bfc9d9',
            color: '#22223b',
            background: '#fff',
            borderRadius: 2,
            letterSpacing: 1,
            whiteSpace: 'nowrap', // Prevents text wrapping
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '&:hover': {
              background: '#f3f6fd',
              borderColor: 'primary.main',
            },
          }}
        >
          CONTINUE WITH GOOGLE
        </Button>
        {error && (
          <Typography color="error" align="center" mt={2}>
            {error}
          </Typography>
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