export interface DomainMappable<T, D> {
  toDomain?: (this: T) => D;
  fromDomain: (domain: D) => T;
}
