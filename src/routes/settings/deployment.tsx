import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/deployment')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Deployment</div>
}
