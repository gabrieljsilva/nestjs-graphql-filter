import { FilterOperations, GraphqlFilterAdapter } from '../../types';

export class JsonAdapter extends GraphqlFilterAdapter {
  getQuery<Output = any, T = any>(filter: FilterOperations<T>): Output {
    return filter as Output;
  }
}
