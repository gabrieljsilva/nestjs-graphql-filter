import { DynamicModule, Type } from '@nestjs/common';
import { GraphqlFilterAdapter } from '../../types';
export declare class GraphqlFilterModule {
    static forRoot(adapter: Type<GraphqlFilterAdapter>): DynamicModule;
    static forFeature(adapter: Type<GraphqlFilterAdapter>): DynamicModule;
}
//# sourceMappingURL=graphql-filter.module.d.ts.map