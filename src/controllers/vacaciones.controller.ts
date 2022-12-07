import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Vacaciones} from '../models';
import {VacacionesRepository} from '../repositories';

export class VacacionesController {
  constructor(
    @repository(VacacionesRepository)
    public vacacionesRepository : VacacionesRepository,
  ) {}

  @post('/vacaciones')
  @response(200, {
    description: 'Vacaciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vacaciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacaciones, {
            title: 'NewVacaciones',
            exclude: ['id'],
          }),
        },
      },
    })
    vacaciones: Omit<Vacaciones, 'id'>,
  ): Promise<Vacaciones> {
    return this.vacacionesRepository.create(vacaciones);
  }

  @get('/vacaciones/count')
  @response(200, {
    description: 'Vacaciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vacaciones) where?: Where<Vacaciones>,
  ): Promise<Count> {
    return this.vacacionesRepository.count(where);
  }

  @get('/vacaciones')
  @response(200, {
    description: 'Array of Vacaciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vacaciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vacaciones) filter?: Filter<Vacaciones>,
  ): Promise<Vacaciones[]> {
    return this.vacacionesRepository.find(filter);
  }

  @patch('/vacaciones')
  @response(200, {
    description: 'Vacaciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacaciones, {partial: true}),
        },
      },
    })
    vacaciones: Vacaciones,
    @param.where(Vacaciones) where?: Where<Vacaciones>,
  ): Promise<Count> {
    return this.vacacionesRepository.updateAll(vacaciones, where);
  }

  @get('/vacaciones/{id}')
  @response(200, {
    description: 'Vacaciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vacaciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vacaciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Vacaciones>
  ): Promise<Vacaciones> {
    return this.vacacionesRepository.findById(id, filter);
  }

  @patch('/vacaciones/{id}')
  @response(204, {
    description: 'Vacaciones PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacaciones, {partial: true}),
        },
      },
    })
    vacaciones: Vacaciones,
  ): Promise<void> {
    await this.vacacionesRepository.updateById(id, vacaciones);
  }

  @put('/vacaciones/{id}')
  @response(204, {
    description: 'Vacaciones PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vacaciones: Vacaciones,
  ): Promise<void> {
    await this.vacacionesRepository.replaceById(id, vacaciones);
  }

  @del('/vacaciones/{id}')
  @response(204, {
    description: 'Vacaciones DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vacacionesRepository.deleteById(id);
  }
}
