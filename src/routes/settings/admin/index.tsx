import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/admin/')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated || !context.auth.user || context.auth.user.role !== 'admin') {
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
