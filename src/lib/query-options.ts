import { queryOptions } from '@tanstack/react-query'

interface AppData {
  id: number
  title: string
  body: string
  userId: number
}

async function fetchAppById(id: string): Promise<AppData> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

  // wait for 1 second
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  if (!response.ok) {
    throw new Error(`Failed to fetch app: ${response.status} ${response.statusText}`)
  }
  
  const data = await response.json()
  return data
}

export function appQueryOptions(id: string) {
  return queryOptions({
    queryKey: ['app', id],
    queryFn: () => fetchAppById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
} 