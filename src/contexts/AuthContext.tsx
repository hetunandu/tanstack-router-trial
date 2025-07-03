import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'user' | 'admin'
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<User>
  signup: (userData: SignupData) => Promise<User>
  logout: () => void
  isAuthenticated: boolean
}

interface SignupData {
  firstName: string
  lastName: string
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'tanstack_auth_user'

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    role: 'user'
  },
  {
    id: '2', 
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin'
  }
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    function loadStoredUser() {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEY)
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Failed to load user from storage:', error)
        localStorage.removeItem(STORAGE_KEY)
      } finally {
        setIsLoading(false)
      }
    }

    loadStoredUser()
  }, [])

  const login = async (email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock authentication logic
    const foundUser = mockUsers.find(user => user.email === email)
    
    if (!foundUser || password !== 'password123') {
      throw new Error('Invalid email or password')
    }

    setUser(foundUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(foundUser))
    
    return foundUser
  }

  const signup = async (userData: SignupData): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email === userData.email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: 'user'
    }

    // Add to mock database
    mockUsers.push(newUser)
    
    setUser(newUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    
    return newUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 