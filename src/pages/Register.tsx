import React, { useState } from 'react'
import { Box, Typography, Button, TextField, Paper, Grid, Link, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { PersonAddOutlined } from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    if (formData.password !== formData.confirmPassword) {
      setError('密码和确认密码不匹配')
      return
    }
    
    try {
      await register(formData.username, formData.email, formData.password)
      navigate('/')
    } catch (err) {
      setError('注册失败，请稍后重试')
    }
  }

  return (
    <Grid container sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }} component="div">
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <PersonAddOutlined sx={{ mr: 2, fontSize: 32 }} />
          <Typography component="h1" variant="h5">
            注册
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
            id="email"
            label="邮箱"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
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
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="确认密码"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            注册
          </Button>
          <Grid container component="div">
            <Grid item component="div">
              <Link href="/login" variant="body2">
                已有账号？立即登录
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Register