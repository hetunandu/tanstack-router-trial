import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/apps')({
  component: RouteComponent,
})

function RouteComponent() {
  console.log('RouteComponent')
  return <>
    <header>This is a header</header>
    <Outlet />
  </>
}
