import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empleado} from './empleado.model';

@model()
export class Vacaciones extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  empleadoid: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  constructor(data?: Partial<Vacaciones>) {
    super(data);
  }
}

export interface VacacionesRelations {
  // describe navigational properties here
}

export type VacacionesWithRelations = Vacaciones & VacacionesRelations;
