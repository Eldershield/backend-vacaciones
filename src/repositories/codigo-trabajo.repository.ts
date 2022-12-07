import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {CodigoTrabajo, CodigoTrabajoRelations} from '../models';

export class CodigoTrabajoRepository extends DefaultCrudRepository<
  CodigoTrabajo,
  typeof CodigoTrabajo.prototype.id,
  CodigoTrabajoRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(CodigoTrabajo, dataSource);
  }
}
