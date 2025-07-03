import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/apps')({
  beforeLoad: ({ context }) => {
    console.log('beforeLoad', context)
    // Check if user is authenticated
    const user = localStorage.getItem('tanstack_auth_user')
    if (!user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: '/apps'
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
  const user = JSON.parse(localStorage.getItem('tanstack_auth_user') || '{}')
  
  const handleLogout = () => {
    localStorage.removeItem('tanstack_auth_user')
    window.location.href = '/'
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
