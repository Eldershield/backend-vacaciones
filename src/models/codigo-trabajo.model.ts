import {Entity, model, property} from '@loopback/repository';

@model()
export class CodigoTrabajo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  antiguedad: number;

  @property({
    type: 'number',
    required: true,
  })
  diasOtorgados: number;

  @property({
    type: 'boolean',
    required: true,
  })
  vigente: boolean;


  constructor(data?: Partial<CodigoTrabajo>) {
    super(data);
  }
}

export interface CodigoTrabajoRelations {
  // describe navigational properties here
}

export type CodigoTrabajoWithRelations = CodigoTrabajo & CodigoTrabajoRelations;
