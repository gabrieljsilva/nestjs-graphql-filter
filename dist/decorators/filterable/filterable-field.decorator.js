"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterableField = void 0;
const graphql_1 = require("../../utils/graphql");
const function_1 = require("../../utils/function");
function FilterableField(fieldTypeFN) {
    return (target, key) => {
        const fieldTypeMetadata = Reflect.getMetadata('design:type', target, key);
        if (fieldTypeMetadata.name === 'Array') {
            if (!fieldTypeFN) {
                throw new Error(`set @FilterableField(() => TypeName)`);
            }
        }
        const { fieldType, isArray } = (0, function_1.unpackFieldTypeIfIsArray)(fieldTypeFN);
        graphql_1.filterableMetadataStorage.defineTypeMetadata(target.constructor, {
            type: fieldType || fieldTypeMetadata,
            isArray: isArray,
            fieldName: key,
        });
    };
}
exports.FilterableField = FilterableField;
//# sourceMappingURL=filterable-field.decorator.js.map