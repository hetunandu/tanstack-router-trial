import { createRoute, Link, useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { rootRoute } from './root'

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: search.redirect as string | undefined,
  }),
  component: LoginComponent,
})

interface LoginFormData {
  email: string
  password: string
}

function LoginComponent() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const search = useSearch({ from: '/login' })
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

    try {
      await login(formData.email, formData.password)
      
      // Navigate to redirect URL or apps page on successful login
      const redirectTo = search.redirect || '/apps'
      navigate({ to: redirectTo })
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Login failed. Please try again.'
      setErrorMessage(errorMsg)
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '2rem auto', 
      padding: '2rem',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      backgroundColor: '#fff'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Login</h1>
      
      <div style={{
        backgroundColor: '#e3f2fd',
        border: '1px solid #90caf9',
        borderRadius: '4px',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>Test Credentials</h3>
        <p style={{ margin: '0.25rem 0', fontSize: '0.875rem' }}>
          <strong>Email:</strong> test@example.com or admin@example.com
        </p>
        <p style={{ margin: '0.25rem 0', fontSize: '0.875rem' }}>
          <strong>Password:</strong> password123
        </p>
      </div>
      
      <form onSubmit={handleFormSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label 
            htmlFor="email"
            style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="Enter your email"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label 
            htmlFor="password"
            style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="Enter your password"
          />
        </div>

        {errorMessage && (
          <div style={{
            color: '#d32f2f',
            marginBottom: '1rem',
            padding: '0.5rem',
            backgroundColor: '#ffebee',
            border: '1px solid #ffcdd2',
            borderRadius: '4px'
          }}>
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: isLoading ? '#ccc' : '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontWeight: '500'
          }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <p style={{ margin: 0, color: '#666' }}>
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            style={{ color: '#1976d2', textDecoration: 'none' }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
} 