import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { appQueryOptions } from '../../lib/query-options'

export const Route = createFileRoute('/apps/$id')({
  loader: async ({ params: { id }, context: { queryClient } }) => {
    if (!id) {
      throw new Error('No app ID provided')
    }
    
    // Ensure the data is in the cache before the component renders
    // This will preload data on hover and ensure it's ready when navigating
    queryClient.ensureQueryData(appQueryOptions(id))
  },
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>
})

function RouteComponent() {
  const { id } = Route.useParams()
  
  // Use suspense query to access the cached data
  const { data: appData } = useSuspenseQuery(appQueryOptions(id))

  return (
    <div className="app-details">
      <h1>App Details</h1>
      <div className="app-info">
        <h2>{appData.title}</h2>
        <p><strong>ID:</strong> {appData.id}</p>
        <p><strong>User ID:</strong> {appData.userId}</p>
        <div className="app-description">
          <h3>Description:</h3>
          <p>{appData.body}</p>
        </div>
      </div>
    </div>
  )
}
