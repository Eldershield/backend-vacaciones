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
  Empleado,
  Vacaciones,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoVacacionesController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/vacaciones', {
    responses: {
      '200': {
        description: 'Array of Empleado has many Vacaciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vacaciones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vacaciones>,
  ): Promise<Vacaciones[]> {
    return this.empleadoRepository.vacaciones(id).find(filter);
  }

  @post('/empleados/{id}/vacaciones', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vacaciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacaciones, {
            title: 'NewVacacionesInEmpleado',
            exclude: ['id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) vacaciones: Omit<Vacaciones, 'id'>,
  ): Promise<Vacaciones> {
    return this.empleadoRepository.vacaciones(id).create(vacaciones);
  }

  @patch('/empleados/{id}/vacaciones', {
    responses: {
      '200': {
        description: 'Empleado.Vacaciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacaciones, {partial: true}),
        },
      },
    })
    vacaciones: Partial<Vacaciones>,
    @param.query.object('where', getWhereSchemaFor(Vacaciones)) where?: Where<Vacaciones>,
  ): Promise<Count> {
    return this.empleadoRepository.vacaciones(id).patch(vacaciones, where);
  }

  @del('/empleados/{id}/vacaciones', {
    responses: {
      '200': {
        description: 'Empleado.Vacaciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vacaciones)) where?: Where<Vacaciones>,
  ): Promise<Count> {
    return this.empleadoRepository.vacaciones(id).delete(where);
  }
}
