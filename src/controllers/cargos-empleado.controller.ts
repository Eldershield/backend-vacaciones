import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cargos,
  Empleado,
} from '../models';
import {CargosRepository} from '../repositories';

export class CargosEmpleadoController {
  constructor(
    @repository(CargosRepository) protected cargosRepository: CargosRepository,
  ) { }

  @get('/cargos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of Cargos has many Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.cargosRepository.empleados(id).find(filter);
  }

  @post('/cargos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Cargos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cargos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInCargos',
            exclude: ['id'],
            optional: ['cargosId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    return this.cargosRepository.empleados(id).create(empleado);
  }

  @patch('/cargos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Cargos.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.cargosRepository.empleados(id).patch(empleado, where);
  }

  @del('/cargos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Cargos.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.cargosRepository.empleados(id).delete(where);
  }
}
