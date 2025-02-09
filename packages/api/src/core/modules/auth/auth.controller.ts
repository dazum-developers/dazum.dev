import { type Request, type Response } from 'express'

import { Controller } from '@/core/controllers'
import env from '@/env'

import AuthService from './auth.service'

type LoginRequest = {
  email: string
  key: string
}

type TError = {
  name: string
  message: string
  stack?: string
}

export default class AuthController extends Controller {
  static readonly #instance: AuthController = new AuthController()
  public service: AuthService

  constructor() {
    super()
    this.service = AuthService.getInstance()
  }

  static getInstance(): AuthController {
    return AuthController.#instance
  }

  async login(req: Request<void, void, LoginRequest>, res: Response) {
    try {
      const { email, key } = req.body

      // Input validation
      if (!email || !key) {
        return res.status(400).json({
          success: false,
          error: 'Email and key are required',
        })
      }

      const data = await AuthController.getInstance().service.login({ email, key })

      return res
        .cookie('at', data, {
          maxAge: 86400,
          // signed: true,
          httpOnly: true,
          secure: env.node === 'production', // Secure in production
        })
        .status(200)
        .json({
          success: true,
          message: 'Login successful',
        })
    } catch (error: unknown) {
      console.error('Login error:', error)
      return res.status(400).json({
        success: false,
        error: (error as TError).message || 'Internal server error',
      })
    }
  }
}
