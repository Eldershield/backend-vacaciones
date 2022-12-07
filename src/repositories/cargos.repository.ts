import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Cargos, CargosRelations, Empleado} from '../models';
import {EmpleadoRepository} from './empleado.repository';

export class CargosRepository extends DefaultCrudRepository<
  Cargos,
  typeof Cargos.prototype.id,
  CargosRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Cargos.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Cargos, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
