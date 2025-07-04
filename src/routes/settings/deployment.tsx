import { createRoute } from '@tanstack/react-router'
import { settingsRoute } from './route'

export const settingsDeploymentRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: '/deployment',
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Deployment</div>
}
