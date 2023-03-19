import { GraphqlFilterAdapter, FilterOperations } from '../../types';
export declare class GraphqlFilterService {
    private readonly graphqlFilterAdapter;
    constructor(graphqlFilterAdapter: GraphqlFilterAdapter);
    getQuery<Output = any, T = any>(filter: FilterOperations<T>): Output;
}
//# sourceMappingURL=graphql-filter.service.d.ts.map