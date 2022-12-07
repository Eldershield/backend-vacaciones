import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Cargos, Vacaciones} from '../models';
import {CargosRepository} from './cargos.repository';
import {VacacionesRepository} from './vacaciones.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly cargos: BelongsToAccessor<Cargos, typeof Empleado.prototype.id>;

  public readonly vacaciones: HasManyRepositoryFactory<Vacaciones, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('CargosRepository') protected cargosRepositoryGetter: Getter<CargosRepository>, @repository.getter('VacacionesRepository') protected vacacionesRepositoryGetter: Getter<VacacionesRepository>,
  ) {
    super(Empleado, dataSource);
    this.vacaciones = this.createHasManyRepositoryFactoryFor('vacaciones', vacacionesRepositoryGetter,);
    this.registerInclusionResolver('vacaciones', this.vacaciones.inclusionResolver);
    this.cargos = this.createBelongsToAccessorFor('cargos', cargosRepositoryGetter,);
    this.registerInclusionResolver('cargos', this.cargos.inclusionResolver);
  }
}
