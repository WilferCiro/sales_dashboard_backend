export interface IMapper<T, U> {
  toDomain(data: T): U;
  toPersistence(data: U): T;
}
