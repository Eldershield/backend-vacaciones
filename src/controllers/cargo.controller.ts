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
import {Cargos} from '../models';
import {CargosRepository} from '../repositories';

export class CargoController {
  constructor(
    @repository(CargosRepository)
    public cargosRepository : CargosRepository,
  ) {}

  @post('/cargos')
  @response(200, {
    description: 'Cargos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cargos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cargos, {
            title: 'NewCargos',
            exclude: ['id'],
          }),
        },
      },
    })
    cargos: Omit<Cargos, 'id'>,
  ): Promise<Cargos> {
    return this.cargosRepository.create(cargos);
  }

  @get('/cargos/count')
  @response(200, {
    description: 'Cargos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cargos) where?: Where<Cargos>,
  ): Promise<Count> {
    return this.cargosRepository.count(where);
  }

  @get('/cargos')
  @response(200, {
    description: 'Array of Cargos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cargos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cargos) filter?: Filter<Cargos>,
  ): Promise<Cargos[]> {
    return this.cargosRepository.find(filter);
  }

  @patch('/cargos')
  @response(200, {
    description: 'Cargos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cargos, {partial: true}),
        },
      },
    })
    cargos: Cargos,
    @param.where(Cargos) where?: Where<Cargos>,
  ): Promise<Count> {
    return this.cargosRepository.updateAll(cargos, where);
  }

  @get('/cargos/{id}')
  @response(200, {
    description: 'Cargos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cargos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cargos, {exclude: 'where'}) filter?: FilterExcludingWhere<Cargos>
  ): Promise<Cargos> {
    return this.cargosRepository.findById(id, filter);
  }

  @patch('/cargos/{id}')
  @response(204, {
    description: 'Cargos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cargos, {partial: true}),
        },
      },
    })
    cargos: Cargos,
  ): Promise<void> {
    await this.cargosRepository.updateById(id, cargos);
  }

  @put('/cargos/{id}')
  @response(204, {
    description: 'Cargos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cargos: Cargos,
  ): Promise<void> {
    await this.cargosRepository.replaceById(id, cargos);
  }

  @del('/cargos/{id}')
  @response(204, {
    description: 'Cargos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cargosRepository.deleteById(id);
  }
}
