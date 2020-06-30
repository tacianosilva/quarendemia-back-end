import { getRepository, Repository, Not } from 'typeorm'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO'
import ISignUpDTO from '@modules/users/dtos/ISignUpDTO'

import User from '../entities/User'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id)

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } })

    return user
  }

  public async countAdms(user_id: string): Promise<number> {
    const count = await this.ormRepository.count({
      where: { isActive: true, type: 'admin', id: Not(user_id) },
    })

    return count
  }

  public async signUp(signUpData: ISignUpDTO): Promise<User> {
    const user = this.ormRepository.create(signUpData)
    user.type = 'common'
    user.isActive = true

    await this.ormRepository.save(user)

    return user
  }

  public async create(userData: ICreateUsersDTO): Promise<User> {
    const user = this.ormRepository.create(userData)
    user.isActive = true

    await this.ormRepository.save(user)

    return user
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }
}

export default UsersRepository
