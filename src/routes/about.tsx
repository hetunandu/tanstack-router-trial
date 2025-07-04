import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './root'

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/about"!</div>
}
