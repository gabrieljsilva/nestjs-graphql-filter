"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterArgs = void 0;
const common_1 = require("@nestjs/common");
const gql_paramtype_enum_1 = require("@nestjs/graphql/dist/enums/gql-paramtype.enum");
const graphql_1 = require("@nestjs/graphql");
const pipes_1 = require("../../pipes");
const FilterArgs = (data) => (target, key, index) => {
    const args = Reflect.getMetadata(graphql_1.PARAM_ARGS_METADATA, target.constructor, key);
    Reflect.defineMetadata(graphql_1.PARAM_ARGS_METADATA, (0, common_1.assignMetadata)(args, gql_paramtype_enum_1.GqlParamtype.ARGS, index, data, pipes_1.FilterPipe), target.constructor, key);
};
exports.FilterArgs = FilterArgs;
//# sourceMappingURL=filter-args.decorator.js.map