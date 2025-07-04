import { createRoute } from '@tanstack/react-router'
import { settingsRoute } from './route'

export const settingsIndexRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: '/',
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Settings</div>
}
