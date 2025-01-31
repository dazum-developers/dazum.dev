import env from '../env'

const route = () => `${env.app.schema}://${env.app.host}:${env.app.port || 3000}`

export function banner() {
  if (['development', 'staging'].includes(env.node?.trim())) {
    console.log('')
    console.log(`🚀 Server is up and running`)
    console.log('To shut it down, press <CTRL> + C at any time.')
    console.log('')
    console.log('-------------------------------------------------------')
    console.log(`Project name : ${env.app.name}`)
    console.log(`Environment  : ${env.node}`)
    console.log(`Version      : ${env.app.version}`)
    console.log('')
    console.log(`API Info     : ${route()}${env.app.routePrefix}`)
    if (env.swagger.enabled) {
      console.log(`Swagger      : ${route()}${env.swagger.route}`)
    }
    if (env.graphql.enabled) {
      console.log(`GraphQL      : ${route()}${env.graphql.route}`)
    }
    if (env.monitor.enabled) {
      console.log(`Monitor      : ${route()}${env.monitor.route}`)
    }
    console.log('-------------------------------------------------------')
    console.log('')
  }
  if (process.env.NODE_ENV === 'production') {
    console.log(`🚀 Server is running at: ${route()}`);
  }
}
