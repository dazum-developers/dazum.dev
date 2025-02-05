import { type NextFunction, type Request, type Response } from 'express'

import HTTPException from './http-exception'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ValidationHelper {
  static isEmail(field: string, optional = false) {
    return (req: Request, _res: Response, next: NextFunction) => {
      if (optional && !(field in req.body)) {
        return next()
      }

      const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/

      if (re.test(String(req.body[field]).toLowerCase())) {
        return next()
      }

      return next(new HTTPException(400, `Field ${field} is not email`))
    }
  }

  static isNotEmpty(field: string, optional = false) {
    return (req: Request, _res: Response, next: NextFunction) => {
      if (optional && !(field in req.body)) {
        return next()
      }

      if (req.body[field]) {
        return next()
      }

      return next(new HTTPException(400, `Field ${field} should not be empty`))
    }
  }

  static isLength(field: string, fieldLength: number, optional = false) {
    return (req: Request, _res: Response, next: NextFunction) => {
      if (optional && !(field in req.body)) {
        return next()
      }

      if (req.body[field].length <= fieldLength) {
        return next()
      }

      return next(new HTTPException(400, `Field ${field} should not be longer than ${fieldLength}`))
    }
  }
}
