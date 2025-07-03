import { Link, createFileRoute } from '@tanstack/react-router'

const apps = [
  { id: '1', name: 'App 1 - React Dashboard' },
  { id: '2', name: 'App 2 - Vue Analytics' },
  { id: '3', name: 'App 3 - Angular CRM' },
  { id: '4', name: 'App 4 - Svelte Portfolio' },
  { id: '5', name: 'App 5 - Next.js Blog' },
]

export const Route = createFileRoute('/apps/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div style={{ padding: '2rem', maxWidth: '600px' }}>
      <h1>Apps Directory</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        💡 <strong>Hover over any app link</strong> to see instant preloading in action! 
        Data will load in the background before you click.
      </p>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {apps.map(app => (
          <li key={app.id} style={{ marginBottom: '1rem' }}>
            <Link 
              to="/apps/$id" 
              params={{ id: app.id }}
              style={{
                display: 'block',
                padding: '1rem',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#333',
                transition: 'all 0.2s ease',
                border: '2px solid transparent'
              }}
              activeProps={{
                style: {
                  backgroundColor: '#e3f2fd',
                  borderColor: '#1976d2'
                }
              }}
              // This enables preloading on hover (already set globally, but can be overridden per link)
              preload="intent"
            >
              <strong>{app.name}</strong>
              <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.25rem' }}>
                Click to view details (ID: {app.id})
              </div>
            </Link>
          </li>
        ))}
      </ul>
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#f0f9ff', 
        borderRadius: '8px',
        border: '1px solid #0ea5e9'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#0369a1' }}>🚀 Preloading Features</h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li><strong>Hover Preloading:</strong> Data loads when you hover over links</li>
          <li><strong>Smart Caching:</strong> Once loaded, navigation is instant</li>
          <li><strong>Background Updates:</strong> Stale data refreshes automatically</li>
          <li><strong>Error Handling:</strong> Failed preloads don't block navigation</li>
        </ul>
      </div>
    </div>
  )
}
