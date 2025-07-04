import { createRoute, Outlet, redirect } from '@tanstack/react-router'
import { rootRoute } from '../root'
import AuthenticatedUserInfo from './components/AuthenticatedUserInfo'

export const appsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/apps',
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
  const { auth: { user, logout } } = appsRoute.useRouteContext()

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
        <AuthenticatedUserInfo user={user} logout={logout} />
      </header>
      <Outlet />
    </>
  )
}

