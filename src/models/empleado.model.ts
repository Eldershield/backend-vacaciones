import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cargos} from './cargos.model';
import {Vacaciones} from './vacaciones.model';

@model()
export class Empleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaIngreso: string;

  @property({
    type: 'string',
    required: true,
  })
  cargoId: string;

  @property({
    type: 'boolean',
    default: true,
  })
  disponible?: boolean;

  @belongsTo(() => Cargos)
  cargosId: string;

  @hasMany(() => Vacaciones)
  vacaciones: Vacaciones[];

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
