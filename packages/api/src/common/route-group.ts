export type RouterGroupOption = { name: string, prefix: string }

export type Route = {
  method: string,
  path: string,
  handler?: unknown,
  middlewares: unknown[],
  validators: unknown[],
  controllers: unknown[]
}

export function routeGroup(groupOptions: RouterGroupOption, routes: Route[]): Route[] {
  return routes.map((route: Route) => ({
    ...route,
    method: route.method.toLowerCase(),
    // Paste absolute path
    path: `/${[groupOptions.prefix, route.path]
      .map((path) => path.replace(/(^\/|\/$)/g, ''))
      .filter((path) => path !== '')
      .join('/')}`,
  }))
}
