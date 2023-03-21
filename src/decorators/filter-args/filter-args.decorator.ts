import { assignMetadata, ParamData } from '@nestjs/common';
import { GqlParamtype } from '@nestjs/graphql/dist/enums/gql-paramtype.enum';
import { PARAM_ARGS_METADATA } from '@nestjs/graphql';

import { FilterPipe } from '../../pipes';

export const FilterArgs = (data: ParamData) => (target, key, index) => {
  const args = Reflect.getMetadata(
    PARAM_ARGS_METADATA,
    target.constructor,
    key,
  );

  Reflect.defineMetadata(
    PARAM_ARGS_METADATA,
    assignMetadata(args, GqlParamtype.ARGS, index, data, FilterPipe),
    target.constructor,
    key,
  );
};
