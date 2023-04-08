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

## Usage
Add the `GraphqlFilterModule` module to the root module of your Nest.js application and also the database adapter you use.

In the example below I am using the [Prisma ORM](@gabrieljsilva/nestjs-graphql-filter-adapter-prisma) adapter.

```typescript
import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/module/prisma.module';
import { AuthModule } from '@modules';
import { GraphqlModule } from './infra/graphql';
import { GraphqlFilterModule } from '@gabrieljsilva/nestjs-graphql-filter';
import { PrismaFilterAdapter } from '@gabrieljsilva/nestjs-graphql-filter-adapter-prisma';

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

Now we can define which fields of our entities can be filtered.
We do this using the "FilterableField" decorator.
Ex: 

```typescript
import { Field, ObjectType } from '@nestjs/graphql';
import { Credentials } from './credentials.model';
import { FilterableField } from '@gabrieljsilva/nestjs-graphql-filter';

@ObjectType()
export class User {
  @FilterableField()
  @Field()
  id: string;

  @FilterableField()
  @Field()
  name: string;

  @FilterableField(() => Credentials)
  @Field()
  credentials?: Credentials;
}
```

If the entity has a nested type, it's mandatory to use an arrow function returning the class.
If this class is an array, it's possible to use an arrow function returning
an array, where the first element will be the type to be returned.

ex:

```typescript
import { Field, ObjectType } from '@nestjs/graphql';
import { Photo } from './photo.model';
import { FilterableField } from '@gabrieljsilva/nestjs-graphql-filter';

@ObjectType()
export class User {
  @FilterableField()
  @Field()
  id: string;

  @FilterableField()
  @Field()
  name: string;

  @FilterableField(() => [Photo])
  @Field()
  photos?: Photo[];
}
```

After defining our filterables we need to generate the classes that represent our filters.
For this we will use the FilterableOf function. This function receives as a parameter a class annotated with "ObjectType"
and with some property annotated with "FilterableField", it will return another derived class.

To define the filter class it is necessary to extend the class that this function returns.
Ex:

```typescript
import { FilterableOf } from '@gabrieljsilva/nestjs-graphql-filter';
import { User } from '@models';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class UserFilters extends FilterableOf(User) {}
```

After define the filterables, it's possible to inject the `GraphqlFilterService` in the application modules.
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

## Quering
There are currently 5 available filter operations, they are:
- equals;
- like;
- not;
- and;
- or;

taking into account that we are going to create a user filter, we can create a query
that lists all users, in which they have names similar to some other name, so we can write 
the following query:

```
query listUsers($filters: UserFilters) {
	getManyUsers(filters: $filters){
        id
        name
	}
}
```

`params`
```json
{
  "filters": {
    "like": {
      "name": "john doe"
    }
  }
}
```

It is also easy to call the "and" and "or" clause:

`params`
```json
{
  "filters": {
    "like": {
      "name": "john doe"
    },
    "and": {
      "equals": {
        "name": "admin"
      },
      "or": {
        "equals": {
          "email": "john.doe@email.com"
        }
      }
    }
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

It's a good idea to create an output type in the same file where we define the filterables.
Ex:


```typescript
import { FilterableOf } from '@gabrieljsilva/nestjs-graphql-filter';
import { User } from '@models';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class UserFilters extends FilterableOf(User) {}
export type UserFilter = Prisma.UserWhereInput;
```

```typescript
import { Injectable } from '@nestjs/common';
import { GraphqlFilterService } from '@gabrieljsilva/nestjs-graphql-filter';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@prisma/module/prisma.service';
import { UserFilters, UserFilter } from '../../../../domain/filterables';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly graphqlFilterService: GraphqlFilterService,
  ) {}

  async getManyUsers(filters?: UserFilters) {
    const findUsersFilters = this.graphqlFilterService.getQuery<UserFilter>(filters);

    return this.prisma.user.findMany({
      where: findUsersFilters,
    });
  }
}
```

So we can point to this type, if we need to change the adapter, we won't suffer so much to change the types as well.