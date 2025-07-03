import { createRouter } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'

// Define the router context interface
export interface RouterContext {
  auth: {
    user: {
      id: string
      email: string
      firstName: string
      lastName: string
      role: 'user' | 'admin'
    } | null
    isAuthenticated: boolean
    isLoading: boolean
  }
  queryClient: QueryClient
}

// Create the router with typed context
export const router = createRouter({
  routeTree,
  context: {
    // auth will be provided by RouterProvider
    auth: undefined!,
    // queryClient will be provided by RouterProvider
    queryClient: undefined!,
  },
  defaultPreload: 'intent', // Preload on hover/focus
  defaultPreloadStaleTime: 0, // Always preload, let TanStack Query handle staleness
})

 