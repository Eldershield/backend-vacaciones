import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Vacaciones, VacacionesRelations} from '../models';

export class VacacionesRepository extends DefaultCrudRepository<
  Vacaciones,
  typeof Vacaciones.prototype.id,
  VacacionesRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Vacaciones, dataSource);
  }
}
