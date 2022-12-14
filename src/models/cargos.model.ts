import {Entity, model, property, hasMany} from '@loopback/repository';
import {Empleado} from './empleado.model';

@model()
export class Cargos extends Entity {
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

  @hasMany(() => Empleado)
  empleados: Empleado[];

  constructor(data?: Partial<Cargos>) {
    super(data);
  }
}

export interface CargosRelations {
  // describe navigational properties here
}

export type CargosWithRelations = Cargos & CargosRelations;
