import React, { useState } from 'react'
import { Box, Typography, Button, TextField, Paper, Grid, Link, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { LockOutlined } from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await login(formData.username, formData.password)
      navigate('/')
    } catch (err) {
      setError('登录失败，请检查用户名和密码')
    }
  }

  return (
    <Grid container sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }} component="div">
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <LockOutlined sx={{ mr: 2, fontSize: 32 }} />
          <Typography component="h1" variant="h5">
            登录
          </Typography>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="用户名"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="密码"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            登录
          </Button>
          <Grid container component="div">
            <Grid item component="div">
              <Link href="/register" variant="body2">
                没有账号？立即注册
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Login