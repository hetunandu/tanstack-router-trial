import { createRoute, redirect } from '@tanstack/react-router'
import { settingsRoute } from '../route'

export const settingsAdminIndexRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: '/admin',
  beforeLoad: ({ context }) => {
    if (!context.auth.user || context.auth.user.role !== 'admin') {
      throw redirect({
        to: '/settings',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Admin</div>
}
