import { PipeTransform, Injectable, Inject } from '@nestjs/common';
import { GraphqlFilterService } from '@gabrieljsilva/nestjs-graphql-filter';

@Injectable()
export class FilterPipe implements PipeTransform {
  constructor(
    @Inject(GraphqlFilterService)
    private readonly graphqlFilterService: GraphqlFilterService,
  ) {}

  transform(value: any) {
    return this.graphqlFilterService.getQuery(value);
  }
}
