import React, { createContext, useState, useContext, ReactNode } from 'react'

interface User {
  id: string
  username: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 设置默认用户，这样用户就可以直接进入系统，不需要登录
  const [user, setUser] = useState<User | null>({
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin'
  })

  const login = async (username: string, password: string) => {
    // 这里应该调用API进行登录验证
    // 模拟登录成功
    setUser({
      id: '1',
      username,
      email: `${username}@example.com`,
      role: 'admin'
    })
  }

  const register = async (username: string, email: string, password: string) => {
    // 这里应该调用API进行注册
    // 模拟注册成功
    setUser({
      id: '1',
      username,
      email,
      role: 'user'
    })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}