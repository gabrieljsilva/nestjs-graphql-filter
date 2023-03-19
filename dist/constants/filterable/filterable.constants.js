"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GRAPHQL_ATOMIC_TYPES = exports.FILTER_LOGICAL_OPERATIONS = exports.FILTERABLE_ENTITY_TYPE_NAME_PATTERN = exports.FILTERABLE_FILTER_TYPE_NAME_PATTERN = void 0;
exports.FILTERABLE_FILTER_TYPE_NAME_PATTERN = '^CLASS_NAME$Filter';
exports.FILTERABLE_ENTITY_TYPE_NAME_PATTERN = '^CLASS_NAME$FilterableEntity';
exports.FILTER_LOGICAL_OPERATIONS = {
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
exports.GRAPHQL_ATOMIC_TYPES = ['String', 'Number', 'Boolean', 'Date'];
//# sourceMappingURL=filterable.constants.js.map