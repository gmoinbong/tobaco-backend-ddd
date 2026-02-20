export abstract class Mapper<Domain, Entity> {
  abstract toDomain(entity: Entity): Domain
  abstract toEntity(domain: Domain): Entity
}