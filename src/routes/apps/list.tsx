import { Link, createFileRoute } from '@tanstack/react-router'


const apps = [
  { id: 1, name: 'App 1' },
  { id: 2, name: 'App 2' },
  { id: 3, name: 'App 3' },
]

export const Route = createFileRoute('/apps/list')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <h1>List of apps</h1>
    <ul>
        {apps.map(app => (
            <li key={app.id}>
                <Link to={`/apps/${app.id}`}>{app.name}</Link>
            </li>
        ))}
    </ul>
  </div>
}
