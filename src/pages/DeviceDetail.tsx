import React, { useState } from 'react'
import { Box, Typography, Divider, Card, CardContent, Grid, Button, Chip, Tab, Tabs } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowBack, Edit, History, Settings, ErrorOutline } from '@mui/icons-material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock数据
const deviceData = {
  id: '1',
  name: '注塑机 #1',
  type: '注塑设备',
  status: '运行中',
  location: '车间A',
  model: 'Model X123',
  manufacturer: '设备制造商A',
  serialNumber: 'SN123456',
  installationDate: '2025-01-15',
  lastMaintenance: '2026-03-15',
  nextMaintenance: '2026-04-15',
  specifications: {
    power: '10kW',
    capacity: '50kg/h',
    temperature: '200-300°C',
    pressure: '100bar'
  }
}

const maintenanceHistory = [
  { date: '2026-03-15', type: '常规维护', description: '更换过滤器', technician: '张三' },
  { date: '2026-02-15', type: '常规维护', description: '润滑检查', technician: '李四' },
  { date: '2026-01-15', type: '故障维修', description: '更换传感器', technician: '王五' },
]

const sensorData = [
  { time: '00:00', temperature: 250, pressure: 80 },
  { time: '04:00', temperature: 255, pressure: 82 },
  { time: '08:00', temperature: 260, pressure: 85 },
  { time: '12:00', temperature: 265, pressure: 88 },
  { time: '16:00', temperature: 270, pressure: 90 },
  { time: '20:00', temperature: 265, pressure: 85 },
]

const DeviceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleEdit = () => {
    navigate(`/devices/edit/${id}`)
  }

  const handleBack = () => {
    navigate('/devices')
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button startIcon={<ArrowBack />} onClick={handleBack}>
          返回
        </Button>
        <Typography variant="h4" sx={{ ml: 2, flexGrow: 1 }}>
          设备详情
        </Typography>
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={handleEdit}
        >
          编辑
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {/* 设备基本信息 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                基本信息
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  设备ID:
                </Typography>
                <Typography variant="body1">
                  {deviceData.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  设备名称:
                </Typography>
                <Typography variant="body1">
                  {deviceData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  设备类型:
                </Typography>
                <Typography variant="body1">
                  {deviceData.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  状态:
                </Typography>
                <Chip 
                  label={deviceData.status} 
                  color={deviceData.status === '运行中' ? 'success' : deviceData.status === '故障' ? 'error' : deviceData.status === '维护中' ? 'info' : 'warning'}
                />
                <Typography variant="body2" color="text.secondary">
                  位置:
                </Typography>
                <Typography variant="body1">
                  {deviceData.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  型号:
                </Typography>
                <Typography variant="body1">
                  {deviceData.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  制造商:
                </Typography>
                <Typography variant="body1">
                  {deviceData.manufacturer}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  序列号:
                </Typography>
                <Typography variant="body1">
                  {deviceData.serialNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  安装日期:
                </Typography>
                <Typography variant="body1">
                  {deviceData.installationDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  上次维护:
                </Typography>
                <Typography variant="body1">
                  {deviceData.lastMaintenance}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  下次维护:
                </Typography>
                <Typography variant="body1">
                  {deviceData.nextMaintenance}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 设备规格 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                设备规格
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 2 }}>
                {Object.entries(deviceData.specifications).map(([key, value]) => (
                  <>
                    <Typography key={key} variant="body2" color="text.secondary">
                      {key}:
                    </Typography>
                    <Typography key={value} variant="body1">
                      {value}
                    </Typography>
                  </>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 设备状态和历史 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="device tabs">
                  <Tab icon={<ErrorOutline />} iconPosition="start" label="状态监控" />
                  <Tab icon={<History />} iconPosition="start" label="维护历史" />
                  <Tab icon={<Settings />} iconPosition="start" label="维护计划" />
                </Tabs>
              </Box>

              {/* 状态监控 */}
              {tabValue === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    实时状态
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sensorData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="温度 (°C)" />
                        <Line type="monotone" dataKey="pressure" stroke="#82ca9d" name="压力 (bar)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </Box>
              )}

              {/* 维护历史 */}
              {tabValue === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    维护历史
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {maintenanceHistory.map((item, index) => (
                      <Box key={index} sx={{ border: 1, borderColor: 'divider', p: 2, borderRadius: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body1" fontWeight="bold">
                            {item.type}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.date}
                          </Typography>
                        </Box>
                        <Typography variant="body2" mb={1}>
                          {item.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          技术员: {item.technician}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {/* 维护计划 */}
              {tabValue === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    维护计划
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      下次维护日期:
                    </Typography>
                    <Typography variant="body1">
                      {deviceData.nextMaintenance}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      维护类型:
                    </Typography>
                    <Typography variant="body1">
                      常规维护
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      预计时长:
                    </Typography>
                    <Typography variant="body1">
                      4小时
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      负责人:
                    </Typography>
                    <Typography variant="body1">
                      张三
                    </Typography>
                  </Box>
                  <Button variant="contained" sx={{ mt: 3 }}>
                    安排维护
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DeviceDetail