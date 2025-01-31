import {Service} from '@/core/services'
import {Repository} from '@/core/repository'

import UserRepository from './index.repository'

export default class UserService extends Service {
  static readonly #instance: UserService = new UserService()

  private constructor(
      private readonly repository: Repository = UserRepository.getRepository()
  ) {
    super()
  }

  static getService() {
    return UserService.#instance
  }
}
