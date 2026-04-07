import React, { useState, useEffect } from 'react'
import { Box, Typography, Divider, Button, TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowBack, Save } from '@mui/icons-material'

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

const EditDevice: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: '待机',
    location: '',
    model: '',
    manufacturer: '',
    serialNumber: '',
    installationDate: '',
    lastMaintenance: '',
    nextMaintenance: '',
    specifications: {
      power: '',
      capacity: '',
      temperature: '',
      pressure: ''
    }
  })

  useEffect(() => {
    // 这里应该调用API获取设备数据
    setFormData(deviceData)
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSpecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [name]: value
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里应该调用API更新设备
    console.log('更新设备:', formData)
    navigate('/devices')
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
        <Typography variant="h4" sx={{ ml: 2 }}>
          编辑设备
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3} component="div">
          {/* 基本信息 */}
          <Grid item xs={12} md={6} component="div">
            <Typography variant="h6" gutterBottom>
              基本信息
            </Typography>
            <TextField
              fullWidth
              label="设备名称"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="设备类型"
              name="type"
              value={formData.type}
              onChange={handleChange}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="status-label">状态</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={formData.status}
                label="状态"
                onChange={handleSelectChange}
              >
                <MenuItem value="运行中">运行中</MenuItem>
                <MenuItem value="待机">待机</MenuItem>
                <MenuItem value="故障">故障</MenuItem>
                <MenuItem value="维护中">维护中</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="位置"
              name="location"
              value={formData.location}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="型号"
              name="model"
              value={formData.model}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="制造商"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="序列号"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          {/* 维护信息 */}
          <Grid item xs={12} md={6} component="div">
            <Typography variant="h6" gutterBottom>
              维护信息
            </Typography>
            <TextField
              fullWidth
              label="安装日期"
              name="installationDate"
              type="date"
              value={formData.installationDate}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="上次维护日期"
              name="lastMaintenance"
              type="date"
              value={formData.lastMaintenance}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="下次维护日期"
              name="nextMaintenance"
              type="date"
              value={formData.nextMaintenance}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              设备规格
            </Typography>
            <TextField
              fullWidth
              label="功率"
              name="power"
              value={formData.specifications.power}
              onChange={handleSpecChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="产能"
              name="capacity"
              value={formData.specifications.capacity}
              onChange={handleSpecChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="温度范围"
              name="temperature"
              value={formData.specifications.temperature}
              onChange={handleSpecChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="压力范围"
              name="pressure"
              value={formData.specifications.pressure}
              onChange={handleSpecChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} component="div">
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
              <Button variant="outlined" onClick={handleBack}>
                取消
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                type="submit"
              >
                保存
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default EditDevice