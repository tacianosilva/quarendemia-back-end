import AppError from '@shared/errors/AppError'

import Measure from '@modules/measures/infra/typeorm/entities/Measure'
import { injectable, inject } from 'tsyringe'
import IMeasuresRepository from '../repositories/IMeasuresRepository'

interface IRequest {
  id: string
}

@injectable()
class ShowMeasureService {
  constructor(
    @inject('MeasuresRepository')
    private measuresRepository: IMeasuresRepository, // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute({ id }: IRequest): Promise<Measure> {
    const measure = await this.measuresRepository.findAllByClient_id(id)

    if (!measure) {
      throw new AppError('Medidas não encontradas')
    }

    return measure
  }
}

export default ShowMeasureService
