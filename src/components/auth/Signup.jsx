import React, { useState } from 'react';
import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
  Box,
  Avatar,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('user');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const db = getFirestore();
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        role: role,
      });
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setSuccess('');
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const db = getFirestore();
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        role: role,
      }, { merge: true });
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
          backdropFilter: 'blur(8px)',
          background: 'rgba(255,255,255,0.88)',
          zIndex: 1,
        }}
      >
        <Stack alignItems="center" spacing={2} mb={3}>
          <img src="/logo.svg" alt="Wealthyleaf Logo" style={{ width: 48, height: 48, marginBottom: 4 }} />
          <Avatar sx={{ bgcolor: 'secondary.main', width: 64, height: 64, boxShadow: 3 }}>
            <PersonAddAlt1Icon fontSize="large" />
          </Avatar>
          <Typography variant="h4" fontWeight={800} color="secondary.main">
            Wealthyleaf
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>
            Join Wealthyleaf today!
          </Typography>
        </Stack>
        <form onSubmit={handleSignup}>
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
            autoComplete="new-password"
            size="medium"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              label="Role"
              onChange={e => setRole(e.target.value)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
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
            disabled={!!success}
          >
            Sign Up
          </Button>
        </form>
        <Divider sx={{ my: 3, fontWeight: 600 }}>or</Divider>
        <Button
          onClick={handleGoogleSignup}
          variant="outlined"
          fullWidth
          aria-label="Continue with Google"
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
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '&:hover': {
              background: '#f3f6fd',
              borderColor: 'secondary.main',
            },
          }}
        >
          CONTINUE WITH GOOGLE
        </Button>
        {error && (
          <Typography color="error" align="center" mt={2} role="alert">
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success.main" align="center" mt={2} role="alert">
            {success}
          </Typography>
        )}
        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Already have an account?{' '}
            <a
              href="/login"
              style={{
                color: '#1976d2',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Login
            </a>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}