import { DynamicModule, Module, Type } from '@nestjs/common';

import { GraphqlFilterService } from './graphql-filter.service';
import { GraphqlFilterAdapter } from '../../types';

@Module({})
export class GraphqlFilterModule {
  static forRoot(adapter: Type<GraphqlFilterAdapter>): DynamicModule {
    return {
      module: GraphqlFilterModule,
      imports: [],
      providers: [
        GraphqlFilterService,
        {
          provide: GraphqlFilterAdapter,
          useClass: adapter,
        },
      ],
      exports: [
        GraphqlFilterService,
        {
          provide: GraphqlFilterAdapter,
          useClass: adapter,
        },
      ],
      global: true,
    };
  }

  static forFeature(adapter: Type<GraphqlFilterAdapter>): DynamicModule {
    return {
      module: GraphqlFilterModule,
      imports: [],
      providers: [
        GraphqlFilterService,
        {
          provide: GraphqlFilterAdapter,
          useClass: adapter,
        },
      ],
      exports: [GraphqlFilterService],
    };
  }
}
