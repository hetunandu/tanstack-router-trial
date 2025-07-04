import { createRoute } from '@tanstack/react-router'
import { settingsRoute } from './route'

export const settingsAuthRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: '/auth',
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Auth</div>
}
