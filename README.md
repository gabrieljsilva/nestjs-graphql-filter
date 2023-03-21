# @gabrieljsilva/nestjs-graphql-filter
Crie filtros para suas aplicações com Nest.js e GraphQL usando decorators.

## Instalação

```sh
npm i @gabrieljsilva/nestjs-graphql-filter
```
or
```sh
yarn add @gabrieljsilva/nestjs-graphql-filter
```

Adicione o módulo `GraphqlFilterModule` ao módulo raiz da sua aplicação Nest.js e também o adapter do banco de dados que usar.

No exemplo abaixo estou usando o adapter do [Prisma ORM](@gabrieljsilva/nestjs-graphql-filter-adapter-prisma).

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

Após registrado, é possível injetar o `GraphqlFilterService` nos módulos da aplicação.
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

Agora é possível gerar as queries do seu banco de dados ou ORM, utilizando o método 'getQuery' em GraphqlFilterService.
Como mostrado no exemplo abaixo, usando o PrismaORM como exemplo.

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
É possível abstrair a criação das queries usando decorators e pipes.

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

Após isso crie o decorator para criar a query.

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

Agora podemos criar usá-la em uma query.

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