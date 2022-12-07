import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vacaciones,
  Empleado,
} from '../models';
import {VacacionesRepository} from '../repositories';

export class VacacionesEmpleadoController {
  constructor(
    @repository(VacacionesRepository)
    public vacacionesRepository: VacacionesRepository,
  ) { }

  @get('/vacaciones/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to Vacaciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof Vacaciones.prototype.id,
  ): Promise<Empleado> {
    return this.vacacionesRepository.empleado(id);
  }
}
