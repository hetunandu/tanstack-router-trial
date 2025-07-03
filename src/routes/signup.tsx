import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export const Route = createFileRoute('/signup')({
  component: SignupComponent,
})

interface SignupFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

function SignupComponent() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  const validateForm = (): boolean => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match')
      return false
    }

    if (formData.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long')
      return false
    }

    return true
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      })
      
      // Navigate to apps page on successful signup
      navigate({ to: '/apps' })
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Signup failed. Please try again.'
      setErrorMessage(errorMsg)
      console.error('Signup error:', error)
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
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign Up</h1>
      
      <form onSubmit={handleFormSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label 
              htmlFor="firstName"
              style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="First name"
            />
          </div>
          
          <div>
            <label 
              htmlFor="lastName"
              style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="Last name"
            />
          </div>
        </div>

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

        <div style={{ marginBottom: '1rem' }}>
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

        <div style={{ marginBottom: '1.5rem' }}>
          <label 
            htmlFor="confirmPassword"
            style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="Confirm your password"
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
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <p style={{ margin: 0, color: '#666' }}>
          Already have an account?{' '}
          <Link 
            to="/login" 
            search={{ redirect: undefined }}
            style={{ color: '#1976d2', textDecoration: 'none' }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
} 