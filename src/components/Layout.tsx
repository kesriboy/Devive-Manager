import React, { useState } from 'react'
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Container, Box, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { Dashboard as DashboardIcon, Devices, Settings, Logout, MonitorHeart, Menu, ChevronLeft } from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'

const Layout: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery((theme as any).breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(!isMobile)
  const drawerWidth = 240
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const menuItems = [
    { text: '仪表盘', icon: <DashboardIcon />, path: '/' },
    { text: '设备管理', icon: <Devices />, path: '/devices' },
    { text: '状态监控', icon: <MonitorHeart />, path: '/monitoring' },
    { text: '维护管理', icon: <Settings />, path: '/maintenance' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              {drawerOpen ? <ChevronLeft /> : <Menu />}
            </IconButton>
          )}
          <Box component="h1" sx={{ flexGrow: 1, fontSize: '1.5rem', fontWeight: 'bold' }}>
            工厂设备管理系统
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
              {user?.username}
            </Typography>
            <ListItemButton onClick={handleLogout} sx={{ minWidth: 'auto' }}>
              <ListItemIcon sx={{ minWidth: 'auto' }}>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="退出" sx={{ display: { xs: 'none', sm: 'block' } }} />
            </ListItemButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{ 
          width: drawerWidth, 
          flexShrink: 0, 
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box' 
          } 
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={RouterLink} to={item.path} onClick={isMobile ? toggleDrawer : undefined}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3, 
        mt: 10, 
        ml: drawerOpen ? drawerWidth : 0,
        transition: (theme as any).transitions.create('margin', {
          easing: (theme as any).transitions.easing.sharp,
          duration: (theme as any).transitions.duration.leavingScreen,
        }),
      }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}

export default Layout