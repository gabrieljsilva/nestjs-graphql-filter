import { FilterOperations } from './filter-operations';

export abstract class GraphqlFilterAdapter {
  abstract getQuery<Output = any, T = any>(filter: FilterOperations<T>): Output;
}
