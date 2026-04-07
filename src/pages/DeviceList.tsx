import React, { useState } from 'react'
import { Box, Typography, Divider, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import { Add, Edit, Delete, Search } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

// Mock数据
interface Device {
  id: string
  name: string
  type: string
  status: string
  location: string
  lastMaintenance: string
  nextMaintenance: string
}

const devices: Device[] = [
  { id: '1', name: '注塑机 #1', type: '注塑设备', status: '运行中', location: '车间A', lastMaintenance: '2026-03-15', nextMaintenance: '2026-04-15' },
  { id: '2', name: '包装机 #2', type: '包装设备', status: '待机', location: '车间B', lastMaintenance: '2026-03-20', nextMaintenance: '2026-04-20' },
  { id: '3', name: '切割机 #3', type: '切割设备', status: '故障', location: '车间C', lastMaintenance: '2026-03-10', nextMaintenance: '2026-04-10' },
  { id: '4', name: '焊接机 #4', type: '焊接设备', status: '维护中', location: '车间A', lastMaintenance: '2026-03-05', nextMaintenance: '2026-04-05' },
  { id: '5', name: '组装线 #5', type: '组装设备', status: '运行中', location: '车间B', lastMaintenance: '2026-03-25', nextMaintenance: '2026-04-25' },
]

const DeviceList: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleAddDevice = () => {
    navigate('/devices/add')
  }

  const handleEditDevice = (id: string) => {
    navigate(`/devices/edit/${id}`)
  }

  const handleDeleteDevice = (id: string) => {
    setSelectedDevice(id)
    setOpen(true)
  }

  const confirmDelete = () => {
    // 这里应该调用API删除设备
    setOpen(false)
    setSelectedDevice(null)
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: '设备ID', width: 100 },
    { field: 'name', headerName: '设备名称', width: 150 },
    { field: 'type', headerName: '设备类型', width: 150 },
    { field: 'status', headerName: '状态', width: 100 },
    { field: 'location', headerName: '位置', width: 100 },
    { field: 'lastMaintenance', headerName: '上次维护', width: 150 },
    { field: 'nextMaintenance', headerName: '下次维护', width: 150 },
    {
      field: 'actions',
      headerName: '操作',
      width: 150,
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="编辑"
          onClick={() => handleEditDevice(params.id as string)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="删除"
          onClick={() => handleDeleteDevice(params.id as string)}
          color="error"
        />,
      ],
    },
  ]

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          设备列表
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddDevice}
        >
          添加设备
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />
      
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={devices}
          columns={columns}
          initialState={{}}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
        />
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          确定要删除该设备吗？
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={confirmDelete} color="error">删除</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default DeviceList