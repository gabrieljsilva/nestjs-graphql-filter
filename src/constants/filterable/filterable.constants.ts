import { FILTER_OPERATIONS } from '../../enums';
import { FilterOperationDescriptor } from '../../types';

export const FILTERABLE_FILTER_TYPE_NAME_PATTERN = '^CLASS_NAME$Filter';
export const FILTERABLE_ENTITY_TYPE_NAME_PATTERN =
  '^CLASS_NAME$FilterableEntity';

export const FILTER_LOGICAL_OPERATIONS: Record<
  FILTER_OPERATIONS,
  FilterOperationDescriptor
> = {
  equals: {
    isArray: false,
    isComparisonOperator: true,
  },
  like: {
    isArray: false,
    isComparisonOperator: true,
  },
  not: {
    isArray: false,
    isComparisonOperator: true,
  },
  and: {
    isArray: true,
    isComparisonOperator: false,
  },
  or: {
    isArray: true,
    isComparisonOperator: false,
  },
};

export const GRAPHQL_ATOMIC_TYPES = ['String', 'Number', 'Boolean', 'Date'];
