// Import all the route definitions
import { rootRoute } from './routes/root'
import { indexRoute } from './routes/index'
import { aboutRoute } from './routes/about'
import { loginRoute } from './routes/login'
import { signupRoute } from './routes/signup'
import { appsRoute } from './routes/apps/route'
import { appsIndexRoute } from './routes/apps/index'
import { appDetailRoute } from './routes/apps/AppEditor'
import { settingsRoute } from './routes/settings/route'
import { settingsIndexRoute } from './routes/settings/index'
import { settingsAuthRoute } from './routes/settings/auth'
import { settingsDeploymentRoute } from './routes/settings/deployment'
import { settingsAdminIndexRoute } from './routes/settings/admin/index'

// Build the route tree
export const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  loginRoute,
  signupRoute,
  appsRoute.addChildren([
    appsIndexRoute,
    appDetailRoute,
  ]),
  settingsRoute.addChildren([
    settingsIndexRoute,
    settingsAuthRoute,
    settingsDeploymentRoute,
    settingsAdminIndexRoute,
  ]),
]) 