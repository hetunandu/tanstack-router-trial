import { createFileRoute, Link } from '@tanstack/react-router'
import '../App.css'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { user, isAuthenticated, logout, isLoading } = Route.useRouteContext().auth

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (isAuthenticated && user) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Welcome back, {user.firstName}!</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          You are successfully logged in as {user.email}
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          marginTop: '2rem',
          flexWrap: 'wrap'
        }}>
          <Link 
            to="/settings"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#1976d2',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: '500'
            }}
          >
            Go to Settings
          </Link>
          <Link 
            to="/apps"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#1976d2',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: '500'
            }}
          >
            Go to Apps
          </Link>
          <Link 
            to="/about"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#666',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: '500'
            }}
          >
            About
          </Link>
          <button
            onClick={logout}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#d32f2f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to My App</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Please login or sign up to access the apps section.
      </p>
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        justifyContent: 'center', 
        marginTop: '2rem',
        flexWrap: 'wrap'
      }}>
        <Link 
          to="/login"
          search={{ redirect: undefined }}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#1976d2',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: '500'
          }}
        >
          Login
        </Link>
        <Link 
          to="/signup"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2e7d32',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: '500'
          }}
        >
          Sign Up
        </Link>
        <Link 
          to="/about"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#666',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: '500'
          }}
        >
          About
        </Link>
      </div>
    </div>
  )
}
