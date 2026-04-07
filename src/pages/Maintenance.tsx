import React, { useState } from 'react'
import { Box, Typography, Divider, Button, Card, CardContent, Grid, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Add, Edit, Delete, CalendarToday, Assignment } from '@mui/icons-material'

// Mock数据
interface MaintenanceTask {
  id: string
  deviceName: string
  type: string
  date: string
  technician: string
  status: string
  description: string
}

const maintenanceTasks: MaintenanceTask[] = [
  { id: '1', deviceName: '注塑机 #1', type: '常规维护', date: '2026-04-15', technician: '张三', status: '计划中', description: '更换过滤器' },
  { id: '2', deviceName: '包装机 #2', type: '常规维护', date: '2026-04-20', technician: '李四', status: '计划中', description: '润滑检查' },
  { id: '3', deviceName: '切割机 #3', type: '故障维修', date: '2026-04-10', technician: '王五', status: '进行中', description: '更换刀片' },
  { id: '4', deviceName: '焊接机 #4', type: '故障维修', date: '2026-04-05', technician: '赵六', status: '已完成', description: '更换传感器' },
]

const Maintenance: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)

  const handleAddTask = () => {
    setOpen(true)
  }

  const handleEditTask = (id: string) => {
    setSelectedTask(id)
    setOpen(true)
  }

  const handleDeleteTask = (id: string) => {
    // 这里应该调用API删除任务
    console.log('删除任务:', id)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedTask(null)
  }

  const handleSubmit = () => {
    // 这里应该调用API添加或更新任务
    setOpen(false)
    setSelectedTask(null)
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          维护管理
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddTask}
        >
          添加维护任务
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3} component="div">
        {maintenanceTasks.map((task) => (
          <Grid item xs={12} md={6} key={task.id} component="div">
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    {task.deviceName}
                  </Typography>
                  <Chip 
                    label={task.status} 
                    color={task.status === '计划中' ? 'info' : task.status === '进行中' ? 'warning' : 'success'}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CalendarToday sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="body2">
                    日期: {task.date}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Assignment sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="body2">
                    类型: {task.type}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    技术员: {task.technician}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  描述: {task.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEditTask(task.id)}
                  >
                    编辑
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    删除
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedTask ? '编辑维护任务' : '添加维护任务'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="设备名称"
              name="deviceName"
            />
            <FormControl fullWidth>
              <InputLabel id="type-label">维护类型</InputLabel>
              <Select
                labelId="type-label"
                name="type"
                label="维护类型"
              >
                <MenuItem value="常规维护">常规维护</MenuItem>
                <MenuItem value="故障维修">故障维修</MenuItem>
                <MenuItem value="预防性维护">预防性维护</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="日期"
              name="date"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="技术员"
              name="technician"
            />
            <FormControl fullWidth>
              <InputLabel id="status-label">状态</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                label="状态"
              >
                <MenuItem value="计划中">计划中</MenuItem>
                <MenuItem value="进行中">进行中</MenuItem>
                <MenuItem value="已完成">已完成</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="描述"
              name="description"
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSubmit} variant="contained">保存</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Maintenance