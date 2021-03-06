import { Request, Response } from 'express'

import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import SignUpManagerService from '@modules/users/services/SignUpManagerService'
import UpdateManagerProfileService from '@modules/users/services/UpdateManagerProfileService'
import ShowManagerProfileService from '@modules/users/services/ShowManagerProfileService'

export default class ManagersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const showManagerProfile = container.resolve(ShowManagerProfileService)

    const user = await showManagerProfile.execute({
      id,
    })

    return response.json(classToClass(user))
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const signUpManager = container.resolve(SignUpManagerService)

    const newUser = await signUpManager.execute({
      name,
      email,
      password,
    })

    return response.json(classToClass(newUser))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user
    const { name, email, old_password, password } = request.body

    const updateManagerProfile = container.resolve(UpdateManagerProfileService)

    const user = await updateManagerProfile.execute({
      id,
      name,
      email,
      old_password,
      password,
    })

    return response.json(classToClass(user))
  }
}
