import { Injectable } from '@nestjs/common';
import { GraphqlFilterAdapter, FilterOperations } from '../../types';

@Injectable()
export class GraphqlFilterService {
  constructor(private readonly graphqlFilterAdapter: GraphqlFilterAdapter) {}

  getQuery<Output = any, T = any>(filter: FilterOperations<T>): Output {
    return this.graphqlFilterAdapter.getQuery<Output, T>(filter) as Output;
  }
}
