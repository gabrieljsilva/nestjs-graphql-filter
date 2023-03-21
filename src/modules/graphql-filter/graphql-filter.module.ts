import { DynamicModule, Module, Type } from '@nestjs/common';

import { GraphqlFilterService } from './graphql-filter.service';
import { GraphqlFilterAdapter } from '../../types';
import { FilterPipe } from '../../pipes';

@Module({})
export class GraphqlFilterModule {
  static forRoot(adapter: Type<GraphqlFilterAdapter>): DynamicModule {
    return {
      module: GraphqlFilterModule,
      imports: [],
      providers: [
        FilterPipe,
        GraphqlFilterService,
        {
          provide: GraphqlFilterAdapter,
          useClass: adapter,
        },
      ],
      exports: [GraphqlFilterService, FilterPipe],
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
