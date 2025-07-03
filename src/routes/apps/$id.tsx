import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '../../contexts/AuthContext'

export const Route = createFileRoute('/apps/$id')({
  component: RouteComponent,
})

function RouteComponent() {
    const { user } = useAuth()
    console.log(user)
  return <div>App details</div>
}
