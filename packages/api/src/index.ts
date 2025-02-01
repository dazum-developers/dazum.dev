import 'reflect-metadata'

import { type Request, type Response, type Application, type IRouterMatcher } from 'express'

import Express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { blue, bold, green } from 'kolorist'

import { logger } from './middlewares/logger'

import { banner } from './utils/banner'
import { shouldCompress } from './utils/compress'

import env from './env'
import { getRouter } from '@/router/index'

export type METHOD = 'get' | 'post' | 'patch' | 'delete'

class Server {
  constructor(
    // @ts-expect-error TS7009: new expression, whose target lacks a construct signature, implicitly has an any type
    private app: Application = new Express(),
  ) {}

  async settingRoutes() {
    const routers = await getRouter()
    console.clear()

    for (const route of routers) {
      if (this.app?.get('env') !== 'test') {
        const path = `${env.app.routePrefix}${route.path}`
        console.log(`${green('✓')}${bold(blue(route.method.toUpperCase()))}: ${blue(path)} configured and setup.`)
      }

      const method: METHOD = route.method

      ;(this.app[method] as IRouterMatcher<unknown>)(`${env.app.routePrefix}${route.path}`, [
        ...route.middlewares,
        ...route.validators,
        ...route.controllers,
      ])
    }

    // 404 error handler
    // @ts-expect-error no overload error
    this.app.use((req: Request, res: Response) => {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `${req.url} not found`,
      })
    })
  }

  async register() {
    try {
      if (!this.app) {
        // @ts-expect-error new expression
        this.app = new Express()
      }

      this.app.use(Express.json())
      this.app.use(logger)
      this.app.use(compression({ filter: shouldCompress, level: 9 }))
      this.app.use(Express.urlencoded({ extended: false }))
      this.app.use(cookieParser())
      this.app.use(cors())

      // parse application/x-www-form-urlencoded
      this.app.use(bodyParser.urlencoded({ extended: false }))

      await this.settingRoutes()

      const port: number = typeof env.app.port === 'number' ? env.app.port : 3000

      return this.app.listen(port, env.app.host, () => {
        banner()
      })
    } catch (error) {
      console.error('Express provider error: ', error)
    }
  }
}

;(async (): Promise<void> => {
  const server = new Server()
  await server.register()
})()
