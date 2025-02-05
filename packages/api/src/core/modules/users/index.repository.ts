import { Repository } from '@/core/repository'
import { prisma } from '@/core/prisma'

export default class UserRepository extends Repository {
  static readonly #instance: UserRepository = new UserRepository()

  constructor() {
    super('users')
  }

  static getRepository() {
    return UserRepository.#instance
  }

  async getOneByEmail(email: string) {
    return prisma.users.findFirst({ where: { email } })
  }

  async getCerealById(id: string) {
    return prisma.cereal.findFirst({ where: { id } })
  }
}
