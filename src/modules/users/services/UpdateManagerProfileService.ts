import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUsersRepository from '../repositories/IUsersRepository'

import User from '../infra/typeorm/entities/User'

interface IRequest {
  id: string
  name: string
  email: string
  old_password?: string
  password?: string
}

@injectable()
class UpdateManagerProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email)

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
      throw new AppError('O e-mail passado já existe na base de dados')
    }

    user.name = name
    user.email = email

    if (password && !old_password) {
      throw new AppError(
        'Você precisa informar a senha antiga para alterar sua senha',
      )
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      )

      if (!checkOldPassword) {
        throw new AppError('Senha antiga incorreta')
      }

      user.password = await this.hashProvider.generateHash(password)
    }

    return this.usersRepository.save(user)
  }
}

export default UpdateManagerProfileService
