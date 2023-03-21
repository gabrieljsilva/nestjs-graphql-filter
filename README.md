# @gabrieljsilva/nestjs-graphql-filter
Create filters for your applications with Nest.js and GraphQL using decorators.

## Installation

```sh
npm i @gabrieljsilva/nestjs-graphql-filter
```
or
```sh
yarn add @gabrieljsilva/nestjs-graphql-filter
```

Add the `GraphqlFilterModule` module to the root module of your Nest.js application and also the database adapter you use.

In the example below I am using the [Prisma ORM](@gabrieljsilva/nestjs-graphql-filter-adapter-prisma) adapter.

```typescript
import { Module } from '@nestjs/common';
import { GraphqlFilterModule } from '@gabrieljsilva/nestjs-graphql-filter';
import { PrismaFilterAdapter } from '@gabrieljsilva/nestjs-graphql-filter-adapter-prisma';

import { PrismaModule } from '@prisma/module/prisma.module';
import { UserModule } from './packages';
import { GraphqlModule } from './infra/graphql';

@Module({
  imports: [
    GraphqlFilterModule.forRoot(PrismaFilterAdapter),
    GraphqlModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

After registered, it is possible to inject the `GraphqlFilterService` in the application modules.
Ex:

```typescript
import { Injectable } from '@nestjs/common';
import { GraphqlFilterService } from '@gabrieljsilva/nestjs-graphql-filter';

@Injectable()
export class UserService {
  constructor(
    private readonly graphqlFilterService: GraphqlFilterService,
  ) {}
}
```

Now it is possible to generate queries from your database or ORM, using the 'getQuery' method in GraphqlFilterService.
As shown in the example below, using PrismaORM as an example.

```typescript
import { Injectable } from '@nestjs/common';
import { GraphqlFilterService } from '@gabrieljsilva/nestjs-graphql-filter';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@prisma/module/prisma.service';
import { UserFilters } from '../../../../domain/filterables';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly graphqlFilterService: GraphqlFilterService,
  ) {}

  async getManyUsers(filters?: UserFilters) {
    const findUsersFilters =
      this.graphqlFilterService.getQuery<Prisma.UserWhereInput>(filters);

    return this.prisma.user.findMany({
      where: findUsersFilters,
    });
  }
}
```

## Utils
It is possible to abstract the creation of queries using decorators and pipes.

Ex:

`transform-filter-args.pipe.ts`
```typescript
import { Inject, PipeTransform } from '@nestjs/common';
import { GraphqlFilterService } from '@gabrieljsilva/nestjs-graphql-filter';

export class TransformFilterArgsPipe implements PipeTransform {
  constructor(
    @Inject(GraphqlFilterService)
    private readonly graphqlFilterService: GraphqlFilterService,
  ) {}

  transform(value: any) {
    return this.graphqlFilterService.getQuery(value);
  }
}
```

After that create the decorator to create the query.

Ex:
`filter-args.decorator.ts`
```typescript
import { Type } from '@nestjs/common';
import { Args, ArgsOptions } from '@nestjs/graphql';

import { TransformFilterArgsPipe } from '../../pipes';

export const FilterArgs = (
  property: string,
  type: Type,
  options?: Omit<ArgsOptions, 'type'>,
) => {
  return (target: Record<string, unknown>, key: string, index: number) => {
    Args(property, { type: () => type, ...options }, TransformFilterArgsPipe)(
      target,
      key,
      index,
    );
  };
};
```

Now we can create and use it in a GraphQL query.

Ex:

```typescript
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(private readonly userService: UserService) {}
  
  @Query(() => UserPaginated)
  getManyUsers(
    @Args('pagination') paginationInput: PaginationInput,
    @FilterArgs('filters', UserFilters) filter: Prisma.UserWhereInput,
  ): Promise<UserPaginated> {
    return this.userService.getManyUsers(paginationInput, filter);
  }
}
```