import { PipeTransform } from '@nestjs/common';
import { GraphqlFilterService } from '@gabrieljsilva/nestjs-graphql-filter';
export declare class FilterPipe implements PipeTransform {
    private readonly graphqlFilterService;
    constructor(graphqlFilterService: GraphqlFilterService);
    transform(value: any): any;
}
//# sourceMappingURL=filter.pipe.d.ts.map