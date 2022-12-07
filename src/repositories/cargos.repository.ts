import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Cargos, CargosRelations} from '../models';

export class CargosRepository extends DefaultCrudRepository<
  Cargos,
  typeof Cargos.prototype.id,
  CargosRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Cargos, dataSource);
  }
}
