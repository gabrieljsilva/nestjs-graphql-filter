"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGraphQLFilterType = void 0;
const graphql_1 = require("@nestjs/graphql");
const lazy_metadata_storage_1 = require("@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage");
const set_pattern_values_1 = require("./set-pattern-values");
const create_class_ref_1 = require("./create-class-ref");
const constants_1 = require("../../constants");
const graphql_2 = require("../graphql");
function createGraphQLFilterType(node) {
    const alreadyAddedType = graphql_2.filterableMetadataStorage.getCreatedTypeByKey(node.value.type.name);
    if (alreadyAddedType)
        return;
    const schemaFilterableEntityName = (0, set_pattern_values_1.setPatternValues)(constants_1.FILTERABLE_ENTITY_TYPE_NAME_PATTERN, { CLASS_NAME: node.key });
    const schemaFilterableEntityRef = (0, create_class_ref_1.createClassRef)(schemaFilterableEntityName);
    const schemaFilterableEntityProperties = node.children.map((child) => {
        var _a, _b;
        let type = child.value.type;
        if (!constants_1.GRAPHQL_ATOMIC_TYPES.includes(child.value.type.name)) {
            const name = (0, set_pattern_values_1.setPatternValues)(constants_1.FILTERABLE_ENTITY_TYPE_NAME_PATTERN, {
                CLASS_NAME: (_b = (_a = child === null || child === void 0 ? void 0 : child.value) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.name,
            });
            type = graphql_2.filterableMetadataStorage.getCreatedTypeByKey(name);
        }
        return {
            name: child.value.fieldName,
            schemaName: child.value.fieldName,
            target: schemaFilterableEntityRef,
            options: {
                isArray: child.value.isArray,
                arrayDepth: 1,
                nullable: true,
            },
            typeFn: () => type,
        };
    });
    lazy_metadata_storage_1.LazyMetadataStorage.store(() => {
        graphql_1.TypeMetadataStorage.addInputTypeMetadata({
            name: schemaFilterableEntityName,
            properties: schemaFilterableEntityProperties,
            target: schemaFilterableEntityRef,
        });
    });
    const logicalOperations = Object.entries(constants_1.FILTER_LOGICAL_OPERATIONS);
    const entityFilterProperties = logicalOperations.map(([name, options]) => {
        return {
            name: name,
            schemaName: name,
            target: schemaFilterableEntityRef,
            options: {
                nullable: true,
            },
            typeFn: () => options.isComparisonOperator
                ? schemaFilterableEntityRef
                : node.value.type,
        };
    });
    const typeName = (0, set_pattern_values_1.setPatternValues)(constants_1.FILTERABLE_FILTER_TYPE_NAME_PATTERN, {
        CLASS_NAME: node.key,
    });
    lazy_metadata_storage_1.LazyMetadataStorage.store(() => {
        graphql_1.TypeMetadataStorage.addInputTypeMetadata({
            name: typeName,
            properties: entityFilterProperties,
            target: node.value.type,
        });
    });
    graphql_2.filterableMetadataStorage.setTypeRefs(node.value.type, schemaFilterableEntityRef);
}
exports.createGraphQLFilterType = createGraphQLFilterType;
//# sourceMappingURL=create-graphql-filter-type.js.map