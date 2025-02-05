import { Repository } from '@/core/repository'

export default class UserRepository extends Repository {
  static readonly #instance: UserRepository = new UserRepository()

  constructor() {
    super('users')
  }

  static getRepository() {
    return UserRepository.#instance
  }
}
