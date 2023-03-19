"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterableMetadataStorage = void 0;
const objects_1 = require("../../objects");
class FilterableMetadataStorage {
    constructor() {
        this.metadata = new Map();
        this.typeRefsMap = new Map();
    }
    defineTypeMetadata(constructor, field) {
        var _a;
        let typeTree = this.metadata.get(constructor.name);
        if (!typeTree) {
            typeTree = new objects_1.Tree(constructor.name, {
                isArray: false,
                type: constructor,
                fieldName: constructor.name,
            });
        }
        const fieldTreeType = this.metadata.get(field.type.name);
        const insertedNode = typeTree.insert({
            key: field.type.name,
            value: {
                type: field.type,
                isArray: field.isArray,
                fieldName: field.fieldName,
            },
            parentNodeKey: constructor.name,
            children: (_a = fieldTreeType === null || fieldTreeType === void 0 ? void 0 : fieldTreeType.getRoot()) === null || _a === void 0 ? void 0 : _a.children,
        });
        this.metadata.set(constructor.name, typeTree);
        return insertedNode;
    }
    getTypeMetadataTree(typeName) {
        return this.metadata.get(typeName);
    }
    setTypeRef(type) {
        const createdTypeAlreadyAdded = this.getCreatedTypeByKey(type.name);
        if (createdTypeAlreadyAdded) {
            throw new Error(`type: ${type.name} already created`);
        }
        this.typeRefsMap.set(type.name, type);
    }
    setTypeRefs(...types) {
        for (const type of types) {
            this.setTypeRef(type);
        }
    }
    getCreatedTypeByKey(typeName) {
        return this.typeRefsMap.get(typeName);
    }
}
exports.filterableMetadataStorage = new FilterableMetadataStorage();
//# sourceMappingURL=filterable-metadata-storage.js.map