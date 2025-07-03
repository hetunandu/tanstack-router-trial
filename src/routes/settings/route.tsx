import { Link, createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/settings')({
  beforeLoad: ({ context }) => {
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

// sidebar with links to /settings/admin and /settings/deploy ment
function RouteComponent() {
  const routeContext = Route.useRouteContext()
  const { user } = routeContext.auth

  return <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      { user?.role === 'admin' && (
        <>
          <li><Link to="/settings/admin/">Admin</Link></li>
        </>
      )}
      <li><Link to="/settings/auth">Auth</Link></li>
      <li><Link to="/settings/deployment">Deployment</Link></li>
    </ul> 
    <Outlet />
  </div>
}
