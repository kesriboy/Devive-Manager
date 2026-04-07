import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'
import Layout from './Layout'

const TestPage = () => <div>Test Page</div>

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <AuthProvider>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </AuthProvider>
  )
}

describe('Layout', () => {
  test('renders without crashing', () => {
    renderWithProviders(
      <Layout>
        <TestPage />
      </Layout>
    )
    expect(screen.getByText('Test Page')).toBeInTheDocument()
  })

  test('renders navigation menu', () => {
    renderWithProviders(
      <Layout>
        <TestPage />
      </Layout>
    )
    expect(screen.getByText('仪表盘')).toBeInTheDocument()
    expect(screen.getByText('设备管理')).toBeInTheDocument()
    expect(screen.getByText('状态监控')).toBeInTheDocument()
    expect(screen.getByText('维护管理')).toBeInTheDocument()
  })

  test('renders logout button', () => {
    renderWithProviders(
      <Layout>
        <TestPage />
      </Layout>
    )
    expect(screen.getByText('退出')).toBeInTheDocument()
  })
})
