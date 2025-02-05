import { Controller } from '@/core/controllers'

import UserService from './index.service'

export default class UserController extends Controller {
  static readonly #instance: UserController = new UserController()

  constructor(public service: UserService = UserService.getService()) {
    super()
  }

  static getController() {
    return UserController.#instance
  }
}
