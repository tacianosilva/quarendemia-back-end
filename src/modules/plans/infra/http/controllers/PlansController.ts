import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

<<<<<<< HEAD
import ListPlansService from '@modules/plans/services/ListPlansService'
=======
import ListPlanService from '@modules/plans/services/ListPlanService'
>>>>>>> e394a3756e34e91c1527e85b4e852c82e58fb175
import CreatePlanService from '@modules/plans/services/CreatePlanService'
import UpdatePlanService from '@modules/plans/services/UpdatePlanService'
import DeletePlanService from '@modules/plans/services/DeletePlanService'

export default class PlansController {
  public async index(request: Request, response: Response): Promise<Response> {
<<<<<<< HEAD
    const listPlans = container.resolve(ListPlansService)

    const plans = await listPlans.execute()
=======
    const { id } = request.user
    const listPlans = container.resolve(ListPlanService)

    const plans = await listPlans.execute({ id })
>>>>>>> e394a3756e34e91c1527e85b4e852c82e58fb175

    return response.json(plans)
  }

  public async create(request: Request, response: Response): Promise<Response> {
<<<<<<< HEAD
    const { name, description, value } = request.body

    const createPlan = container.resolve(CreatePlanService)

    const plan = await createPlan.execute({
=======
    const { id } = request.user
    const { name, description, value } = request.body
    const createPlan = container.resolve(CreatePlanService)

    const plan = await createPlan.execute({
      user_id: id,
>>>>>>> e394a3756e34e91c1527e85b4e852c82e58fb175
      name,
      description,
      value,
    })

    return response.json(classToClass(plan))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, description, value } = request.body
    const { id } = request.params

    const updatePlan = container.resolve(UpdatePlanService)

    const plan = await updatePlan.execute({
      plan_id: id,
      name,
      description,
      value,
    })

    return response.json(classToClass(plan))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deletePlan = container.resolve(DeletePlanService)

    await deletePlan.execute({
      plan_id: id,
    })

    return response.status(204).send()
  }
}
