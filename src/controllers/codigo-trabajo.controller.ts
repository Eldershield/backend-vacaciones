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
import {CodigoTrabajo} from '../models';
import {CodigoTrabajoRepository} from '../repositories';

export class CodigoTrabajoController {
  constructor(
    @repository(CodigoTrabajoRepository)
    public codigoTrabajoRepository : CodigoTrabajoRepository,
  ) {}

  @post('/codigo-trabajos')
  @response(200, {
    description: 'CodigoTrabajo model instance',
    content: {'application/json': {schema: getModelSchemaRef(CodigoTrabajo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CodigoTrabajo, {
            title: 'NewCodigoTrabajo',
            exclude: ['id'],
          }),
        },
      },
    })
    codigoTrabajo: Omit<CodigoTrabajo, 'id'>,
  ): Promise<CodigoTrabajo> {
    return this.codigoTrabajoRepository.create(codigoTrabajo);
  }

  @get('/codigo-trabajos/count')
  @response(200, {
    description: 'CodigoTrabajo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CodigoTrabajo) where?: Where<CodigoTrabajo>,
  ): Promise<Count> {
    return this.codigoTrabajoRepository.count(where);
  }

  @get('/codigo-trabajos')
  @response(200, {
    description: 'Array of CodigoTrabajo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CodigoTrabajo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CodigoTrabajo) filter?: Filter<CodigoTrabajo>,
  ): Promise<CodigoTrabajo[]> {
    return this.codigoTrabajoRepository.find(filter);
  }

  @patch('/codigo-trabajos')
  @response(200, {
    description: 'CodigoTrabajo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CodigoTrabajo, {partial: true}),
        },
      },
    })
    codigoTrabajo: CodigoTrabajo,
    @param.where(CodigoTrabajo) where?: Where<CodigoTrabajo>,
  ): Promise<Count> {
    return this.codigoTrabajoRepository.updateAll(codigoTrabajo, where);
  }

  @get('/codigo-trabajos/{id}')
  @response(200, {
    description: 'CodigoTrabajo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CodigoTrabajo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CodigoTrabajo, {exclude: 'where'}) filter?: FilterExcludingWhere<CodigoTrabajo>
  ): Promise<CodigoTrabajo> {
    return this.codigoTrabajoRepository.findById(id, filter);
  }

  @patch('/codigo-trabajos/{id}')
  @response(204, {
    description: 'CodigoTrabajo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CodigoTrabajo, {partial: true}),
        },
      },
    })
    codigoTrabajo: CodigoTrabajo,
  ): Promise<void> {
    await this.codigoTrabajoRepository.updateById(id, codigoTrabajo);
  }

  @put('/codigo-trabajos/{id}')
  @response(204, {
    description: 'CodigoTrabajo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() codigoTrabajo: CodigoTrabajo,
  ): Promise<void> {
    await this.codigoTrabajoRepository.replaceById(id, codigoTrabajo);
  }

  @del('/codigo-trabajos/{id}')
  @response(204, {
    description: 'CodigoTrabajo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.codigoTrabajoRepository.deleteById(id);
  }
}
