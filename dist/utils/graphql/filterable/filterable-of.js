"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterableOf = void 0;
const filterable_metadata_storage_1 = require("./filterable-metadata-storage");
const function_1 = require("../../function");
function FilterableOf(type) {
    const metadataTypeTree = filterable_metadata_storage_1.filterableMetadataStorage.getTypeMetadataTree(type.name);
    for (const metadataTypeNode of metadataTypeTree.postOrderTraversal()) {
        if (!metadataTypeNode.isLeaf()) {
            (0, function_1.createGraphQLFilterType)(metadataTypeNode);
        }
    }
    return metadataTypeTree.getRoot().value.type;
}
exports.FilterableOf = FilterableOf;
//# sourceMappingURL=filterable-of.js.map