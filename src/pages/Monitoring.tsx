import React, { useState, useEffect } from 'react'
import { Box, Typography, Divider, Card, CardContent, Grid, Chip, Alert, Button, IconButton } from '@mui/material'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Refresh, ViewList, ViewModule } from '@mui/icons-material'

// Mock数据
interface DeviceStatus {
  id: string
  name: string
  status: string
  temperature: number
  pressure: number
  humidity: number
  lastUpdated: string
  alerts: Alert[]
}

interface Alert {
  id: string
  type: string
  message: string
  timestamp: string
  priority: 'high' | 'medium' | 'low'
}

const devices: DeviceStatus[] = [
  {
    id: '1',
    name: '注塑机 #1',
    status: '运行中',
    temperature: 260,
    pressure: 85,
    humidity: 45,
    lastUpdated: '2026-04-07 15:00',
    alerts: [
      { id: '1', type: '温度异常', message: '温度高于阈值', timestamp: '2026-04-07 14:30', priority: 'high' },
    ]
  },
  {
    id: '2',
    name: '包装机 #2',
    status: '待机',
    temperature: 25,
    pressure: 0,
    humidity: 40,
    lastUpdated: '2026-04-07 14:00',
    alerts: []
  },
  {
    id: '3',
    name: '切割机 #3',
    status: '故障',
    temperature: 30,
    pressure: 0,
    humidity: 42,
    lastUpdated: '2026-04-07 13:30',
    alerts: [
      { id: '2', type: '设备故障', message: '电机故障', timestamp: '2026-04-07 13:15', priority: 'high' },
    ]
  },
  {
    id: '4',
    name: '焊接机 #4',
    status: '维护中',
    temperature: 28,
    pressure: 0,
    humidity: 43,
    lastUpdated: '2026-04-07 12:00',
    alerts: []
  },
  {
    id: '5',
    name: '组装线 #5',
    status: '运行中',
    temperature: 22,
    pressure: 0,
    humidity: 38,
    lastUpdated: '2026-04-07 15:00',
    alerts: [
      { id: '3', type: '需要维护', message: '润滑不足', timestamp: '2026-04-07 10:00', priority: 'low' },
    ]
  },
]

const sensorData = [
  { time: '00:00', temperature: 250, pressure: 80 },
  { time: '04:00', temperature: 255, pressure: 82 },
  { time: '08:00', temperature: 260, pressure: 85 },
  { time: '12:00', temperature: 265, pressure: 88 },
  { time: '16:00', temperature: 270, pressure: 90 },
  { time: '20:00', temperature: 265, pressure: 85 },
]

const Monitoring: React.FC = () => {
  const [devicesList, setDevicesList] = useState<DeviceStatus[]>(devices)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedDevice, setSelectedDevice] = useState<DeviceStatus | null>(devices[0])

  useEffect(() => {
    // 模拟实时数据更新
    const interval = setInterval(() => {
      setDevicesList(prev => prev.map(device => ({
        ...device,
        temperature: device.status === '运行中' ? device.temperature + Math.random() * 2 - 1 : device.temperature,
        pressure: device.status === '运行中' ? device.pressure + Math.random() * 1 - 0.5 : device.pressure,
        lastUpdated: new Date().toLocaleString('zh-CN')
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    // 模拟刷新数据
    setDevicesList([...devices])
  }

  const handleDeviceSelect = (device: DeviceStatus) => {
    setSelectedDevice(device)
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          设备状态监控
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <IconButton onClick={() => setViewMode('grid')} color={viewMode === 'grid' ? 'primary' : 'default'}>
            <ViewModule />
          </IconButton>
          <IconButton onClick={() => setViewMode('list')} color={viewMode === 'list' ? 'primary' : 'default'}>
            <ViewList />
          </IconButton>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRefresh}
          >
            刷新
          </Button>
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3} component="div">
        {/* 设备列表 */}
        <Grid item xs={12} md={4} component="div">
          <Typography variant="h6" gutterBottom component="div">
            设备列表
          </Typography>
          <Box sx={{ display: viewMode === 'grid' ? 'grid' : 'flex', flexDirection: viewMode === 'list' ? 'column' : 'row', gap: 2, flexWrap: 'wrap' }}>
            {devicesList.map((device) => (
              <Card 
                key={device.id} 
                sx={{ 
                  width: viewMode === 'grid' ? '100%' : '100%',
                  border: selectedDevice?.id === device.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  cursor: 'pointer'
                }}
                onClick={() => handleDeviceSelect(device)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="div">
                      {device.name}
                    </Typography>
                    <Chip 
                      label={device.status} 
                      color={device.status === '运行中' ? 'success' : device.status === '故障' ? 'error' : device.status === '维护中' ? 'info' : 'warning'}
                    />
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" component="div">
                      温度:
                    </Typography>
                    <Typography variant="body2" component="div">
                      {device.temperature.toFixed(1)} °C
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
                      压力:
                    </Typography>
                    <Typography variant="body2" component="div">
                      {device.pressure.toFixed(1)} bar
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
                      湿度:
                    </Typography>
                    <Typography variant="body2" component="div">
                      {device.humidity.toFixed(1)} %
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }} component="div">
                    最后更新: {device.lastUpdated}
                  </Typography>
                  {device.alerts.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Alert severity="error" sx={{ fontSize: '0.75rem', p: 1 }}>
                        {device.alerts.length} 个警报
                      </Alert>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* 设备详情和图表 */}
        <Grid item xs={12} md={8} component="div">
          {selectedDevice && (
            <>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom component="div">
                    {selectedDevice.name} - 实时状态
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, mb: 3 }}>
                    <Box sx={{ textAlign: 'center', p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                      <Typography variant="body2" color="text.secondary" component="div">
                        温度
                      </Typography>
                      <Typography variant="h4" component="div">
                        {selectedDevice.temperature.toFixed(1)}
                      </Typography>
                      <Typography variant="body2" component="div">
                        °C
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                      <Typography variant="body2" color="text.secondary" component="div">
                        压力
                      </Typography>
                      <Typography variant="h4" component="div">
                        {selectedDevice.pressure.toFixed(1)}
                      </Typography>
                      <Typography variant="body2" component="div">
                        bar
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                      <Typography variant="body2" color="text.secondary" component="div">
                        湿度
                      </Typography>
                      <Typography variant="h4" component="div">
                        {selectedDevice.humidity.toFixed(1)}
                      </Typography>
                      <Typography variant="body2" component="div">
                        %
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} component="div">
                    最后更新: {selectedDevice.lastUpdated}
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sensorData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="temperature" stroke="#8884d8" fill="#8884d8" name="温度 (°C)" />
                        <Area type="monotone" dataKey="pressure" stroke="#82ca9d" fill="#82ca9d" name="压力 (bar)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>

              {/* 警报列表 */}
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="div">
                      警报列表
                    </Typography>
                    <Chip 
                      label={`${selectedDevice.alerts.length} 个警报`} 
                      color={selectedDevice.alerts.length > 0 ? 'error' : 'success'}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {selectedDevice.alerts.length > 0 ? (
                      selectedDevice.alerts.map((alert) => (
                        <Alert 
                          key={alert.id} 
                          severity={alert.priority === 'high' ? 'error' : alert.priority === 'medium' ? 'warning' : 'info'}
                          sx={{ position: 'relative' }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 'bold' }} component="div">
                                {alert.type}
                              </Typography>
                              <Typography variant="body2" component="div">
                                {alert.message}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" component="div">
                              {alert.timestamp}
                            </Typography>
                          </Box>
                        </Alert>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }} component="div">
                        暂无警报
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Monitoring