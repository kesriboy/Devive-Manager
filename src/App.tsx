import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// 导入组件
import Layout from './components/Layout'
import DeviceList from './pages/DeviceList'
import DeviceDetail from './pages/DeviceDetail'
import AddDevice from './pages/AddDevice'
import EditDevice from './pages/EditDevice'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Maintenance from './pages/Maintenance'
import Monitoring from './pages/Monitoring'

// 导入认证上下文
import { AuthProvider } from './contexts/AuthContext'

// 创建主题
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/devices" element={<DeviceList />} />
              <Route path="/devices/:id" element={<DeviceDetail />} />
              <Route path="/devices/add" element={<AddDevice />} />
              <Route path="/devices/edit/:id" element={<EditDevice />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/monitoring" element={<Monitoring />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App