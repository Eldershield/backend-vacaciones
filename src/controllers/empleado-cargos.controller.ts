import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleado,
  Cargos,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoCargosController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/cargos', {
    responses: {
      '200': {
        description: 'Cargos belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cargos)},
          },
        },
      },
    },
  })
  async getCargos(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<Cargos> {
    return this.empleadoRepository.cargos(id);
  }
}
