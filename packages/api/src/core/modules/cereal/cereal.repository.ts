import { Repository } from '@/core/repository'
import { prisma } from '@/core/prisma'

export default class CerealRepository extends Repository {
  static readonly #instance: CerealRepository = new CerealRepository()

  constructor() {
    super('cereal')
  }

  static getRepository() {
    return CerealRepository.#instance
  }

  async getOneById(id: string) {
    return prisma.cereal.findFirst({ where: { user_id: id } })
  }
}
