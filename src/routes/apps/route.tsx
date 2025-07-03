import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../../contexts/AuthContext'

export const Route = createFileRoute('/apps')({
  beforeLoad: ({ context, location }) => {
    // Check if user is authenticated using router context
    if (!context.auth.isAuthenticated || !context.auth.user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <header style={{ 
        padding: '1rem 2rem', 
        backgroundColor: '#f5f5f5', 
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0 }}>Apps Dashboard</h2>
        <AuthenticatedUserInfo />
      </header>
      <Outlet />
    </>
  )
}

function AuthenticatedUserInfo() {
  const routeContext = Route.useRouteContext()
  const { user } = routeContext.auth
  const { logout } = useAuth()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate({ to: '/' })
  }

  if (!user) {
    return null
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <span>Welcome, {user.firstName} {user.lastName}</span>
      <button
        onClick={handleLogout}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#d32f2f',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.875rem'
        }}
      >
        Logout
      </button>
    </div>
  )
}
