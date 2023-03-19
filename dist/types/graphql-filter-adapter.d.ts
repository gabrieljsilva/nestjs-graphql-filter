import { FilterOperations } from './filter-operations';
export declare abstract class GraphqlFilterAdapter {
    abstract getQuery<Output = any, T = any>(filter: FilterOperations<T>): Output;
}
//# sourceMappingURL=graphql-filter-adapter.d.ts.map