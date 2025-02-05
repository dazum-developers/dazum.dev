import Bun from 'bun'

import { Service } from '@/core/services'
import UserRepository from '@/core/modules/users/index.repository'
import CerealRepository from '@/core/modules/cereal/cereal.repository'

import HTTPException from '@/common/http-exception'

import ErrorMessages from '@/constants/error-messages'

export default class AuthService extends Service {
  static readonly #instance: AuthService = new AuthService()

  constructor(
    private readonly userRepository: UserRepository = UserRepository.getRepository(),
    private readonly cerealRepository: CerealRepository = CerealRepository.getRepository(),
  ) {
    super()
  }

  static getInstance(): AuthService {
    return this.#instance
  }

  async login(payload: { email: string; key: string }): Promise<string> {
    const { email, key } = payload
    const user = await this.userRepository.getOneByEmail(email)

    if (!user) {
      throw new HTTPException(404, ErrorMessages.USER_NOT_FOUND)
    }

    const cereal = await this.cerealRepository.getOneById(user.id)

    if (!cereal) {
      throw new HTTPException(404, ErrorMessages.INVALID_CREDENTIAL)
    }

    const encrypted = this.#encryptKey(key, user.id)
    const isMatch = await this.#verifyCereal(encrypted, cereal.key)

    if (!isMatch) {
      throw new HTTPException(404, ErrorMessages.INVALID_CREDENTIAL)
    }

    return btoa(await Bun.password.hash(user.id))
  }

  #encryptKey(key: string, id: string): string {
    return `${id}|${key}|${id}`
  }

  async #verifyCereal(payload: string, key: string): Promise<boolean> {
    const dHash = atob(JSON.parse(atob(key)).key)

    return await Bun.password.verify(payload, dHash)
  }
}
