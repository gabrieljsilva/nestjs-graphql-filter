import { PipeTransform, Injectable } from '@nestjs/common';
import { GraphqlFilterService } from '@gabrieljsilva/nestjs-graphql-filter';

@Injectable()
export class FilterPipe implements PipeTransform {
  constructor(private readonly graphqlFilterService: GraphqlFilterService) {}

  transform(value: any) {
    return this.graphqlFilterService.getQuery(value);
  }
}
