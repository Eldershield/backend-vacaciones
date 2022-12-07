import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Cargos>) {
    super(data);
  }
}

export interface CargosRelations {
  // describe navigational properties here
}

export type CargosWithRelations = Cargos & CargosRelations;
