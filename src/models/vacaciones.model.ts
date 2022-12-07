import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Vacaciones>) {
    super(data);
  }
}

export interface VacacionesRelations {
  // describe navigational properties here
}

export type VacacionesWithRelations = Vacaciones & VacacionesRelations;
