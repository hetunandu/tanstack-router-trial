import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Auth</div>
}
