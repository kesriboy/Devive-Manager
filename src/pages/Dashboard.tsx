import React from 'react'
import { Box, Grid, Card, CardContent, Typography, Divider, Chip } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Mock数据
const deviceStatusData = [
  { name: '运行中', value: 15 },
  { name: '待机', value: 8 },
  { name: '故障', value: 3 },
  { name: '维护中', value: 4 },
]

const monthlyMaintenanceData = [
  { name: '1月', 维护次数: 12 },
  { name: '2月', 维护次数: 19 },
  { name: '3月', 维护次数: 15 },
  { name: '4月', 维护次数: 22 },
  { name: '5月', 维护次数: 18 },
  { name: '6月', 维护次数: 25 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        仪表盘
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={3}>
        {/* 设备状态卡片 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                设备状态分布
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {deviceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* 月度维护统计 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                月度维护统计
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyMaintenanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="维护次数" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* 设备概览 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                设备概览
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      30
                    </Typography>
                    <Typography variant="body2">
                      总设备数
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="success.main">
                      15
                    </Typography>
                    <Typography variant="body2">
                      运行中
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="warning.main">
                      3
                    </Typography>
                    <Typography variant="body2">
                      故障
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="info.main">
                      4
                    </Typography>
                    <Typography variant="body2">
                      维护中
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* 最近警报 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                最近警报
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="body1">
                      设备 #123 - 温度异常
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      2026-04-07 14:30
                    </Typography>
                  </Box>
                  <Chip label="高优先级" color="error" />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="body1">
                      设备 #456 - 压力过高
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      2026-04-07 13:15
                    </Typography>
                  </Box>
                  <Chip label="中优先级" color="warning" />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="body1">
                      设备 #789 - 需要维护
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      2026-04-07 10:00
                    </Typography>
                  </Box>
                  <Chip label="低优先级" color="info" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard