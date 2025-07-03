import { createRootRouteWithContext, createRoute } from '@tanstack/react-router'
import type { RouterContext } from './router'

// Import components and route configurations
import { Route as RootFileRoute } from './routes/__root'
import { Route as IndexFileRoute } from './routes/index'
import { Route as AboutFileRoute } from './routes/about'
import { Route as LoginFileRoute } from './routes/login'
import { Route as SignupFileRoute } from './routes/signup'
import { Route as AppsLayoutFileRoute } from './routes/apps/route'
import { Route as AppsIndexFileRoute } from './routes/apps/index'
import { Route as AppsHeaderFileRoute } from './routes/apps/header'
import { Route as AppDetailFileRoute } from './routes/apps/$id'
import { Route as SettingsLayoutFileRoute } from './routes/settings/route'
import { Route as SettingsIndexFileRoute } from './routes/settings/index'
import { Route as SettingsAuthFileRoute } from './routes/settings/auth'
import { Route as SettingsDeploymentFileRoute } from './routes/settings/deployment'
import { Route as SettingsAdminIndexFileRoute } from './routes/settings/admin/index'

// Create the root route with context
export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootFileRoute.options.component,
})

// Create all routes using the components from the file-based routes
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexFileRoute.options.component,
})

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'about',
  component: AboutFileRoute.options.component,
})

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'login',
  validateSearch: LoginFileRoute.options.validateSearch,
  component: LoginFileRoute.options.component,
})

export const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'signup',
  component: SignupFileRoute.options.component,
})

// Apps routes
export const appsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'apps',
  beforeLoad: AppsLayoutFileRoute.options.beforeLoad,
  component: AppsLayoutFileRoute.options.component,
})

export const appsIndexRoute = createRoute({
  getParentRoute: () => appsRoute,
  path: '/',
  component: AppsIndexFileRoute.options.component,
})

export const appsHeaderRoute = createRoute({
  getParentRoute: () => appsRoute,
  path: 'header',
  component: AppsHeaderFileRoute.options.component,
})

export const appDetailRoute = createRoute({
  getParentRoute: () => appsRoute,
  path: '$id',
  loader: AppDetailFileRoute.options.loader,
  component: AppDetailFileRoute.options.component,
  pendingComponent: AppDetailFileRoute.options.pendingComponent,
})

// Settings routes
export const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'settings',
  beforeLoad: SettingsLayoutFileRoute.options.beforeLoad,
  component: SettingsLayoutFileRoute.options.component,
})

export const settingsIndexRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: '/',
  component: SettingsIndexFileRoute.options.component,
})

export const settingsAuthRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: 'auth',
  component: SettingsAuthFileRoute.options.component,
})

export const settingsDeploymentRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: 'deployment',
  component: SettingsDeploymentFileRoute.options.component,
})

export const settingsAdminIndexRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: 'admin/',
  beforeLoad: SettingsAdminIndexFileRoute.options.beforeLoad,
  component: SettingsAdminIndexFileRoute.options.component,
})

// Build the route tree
export const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  loginRoute,
  signupRoute,
  appsRoute.addChildren([
    appsIndexRoute,
    appsHeaderRoute,
    appDetailRoute,
  ]),
  settingsRoute.addChildren([
    settingsIndexRoute,
    settingsAuthRoute,
    settingsDeploymentRoute,
    settingsAdminIndexRoute,
  ]),
]) 