"use client"

import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { registerUser } from '@/redux/features/userSlice'
import { signIn } from 'next-auth/react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
  InputAdornment,
  IconButton,
  Container,
  CssBaseline,
  Alert,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'

type Inputs = {
  email: string
  password: string
}

const GoogleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    style={{ marginRight: 12, display: 'block' }}
  >
    <path
      fill="#EA4335"
      d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.764 1.05 15.027 0 12 0 7.305 0 3.327 2.69 1.386 6.614l3.88 3.151z"
    />
    <path
      fill="#4285F4"
      d="M23.636 12.273c0-.818-.082-1.609-.218-2.364H12v4.545h6.545a5.58 5.58 0 0 1-2.427 3.664l3.773 2.927c2.209-2.036 3.745-5.036 3.745-8.773z"
    />
    <path
      fill="#FBBC05"
      d="M5.266 14.235A7.02 7.02 0 0 1 4.909 12c0-.79.136-1.545.357-2.235L1.386 6.614A11.948 11.948 0 0 0 0 12c0 1.927.455 3.755 1.255 5.386l4.01-3.151z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.245 0 5.973-1.077 7.964-2.927l-3.773-2.927c-1.045.7-2.382 1.118-4.191 1.118-3.227 0-5.964-2.182-6.936-5.118L1.055 17.29A11.956 11.956 0 0 0 12 24z"
    />
  </svg>
)

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const dispatch = useDispatch()
  const router = useRouter()
  const { currentUser, users } = useSelector((state: any) => state.user)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  useEffect(() => {
    if (currentUser) {
      router.push('/dashboard')
    }
  }, [currentUser, router])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    setLoginError(null)
    const existingUser = (users || []).find((u: any) => u.email === data.email)
    if (existingUser) {
      if (existingUser.password === data.password) {
        try {
          const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
          })
          if (result?.error) {
            setLoginError(result.error)
          }
        } catch (err: any) {
          setLoginError(err.message || 'Login failed')
        }
      } else {
        setLoginError('Incorrect password')
      }
    } else {
      // Auto register first
      dispatch(registerUser({ email: data.email, password: data.password }))
      try {
        const result = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false
        })
        if (result?.error) {
          setLoginError(result.error)
        }
      } catch (err: any) {
        setLoginError(err.message || 'Login failed')
      }
    }
    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signIn('google')
    } catch (error) {
      console.error("Google sign in error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 2,
      }}
    >
      <CssBaseline />
      <Container maxWidth="xs" sx={{ p: 0 }}>
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            borderRadius: 2,
            width: '100%',
          }}
        >
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                mb: 1,
              }}
            >
              Sign In
            </Typography>
          </Box>

          {loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {loginError}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={loading}
            />

            <TextField
              {...register('password', {
                required: 'Password is required',
              })}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={loading}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              size="large"
              sx={{
                py: 1.2,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
              OR
            </Typography>
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleSignIn}
            disabled={loading}
            startIcon={<GoogleIcon />}
            size="large"
            sx={{
              py: 1.2,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.95rem',
            }}
          >
            Continue with Google
          </Button>

          
        </Paper>
      </Container>
    </Box>
  )
}