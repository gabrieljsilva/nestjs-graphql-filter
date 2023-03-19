import { Tree } from '../../objects';
import { Type } from '@nestjs/common';
import { FieldType } from '../../../types';
declare class FilterableMetadataStorage {
    private metadata;
    private typeRefsMap;
    constructor();
    defineTypeMetadata(constructor: Type, field: FieldType): import("../../objects").TreeNode<FieldType>;
    getTypeMetadataTree(typeName: string): Tree<FieldType>;
    setTypeRef(type: Type): void;
    setTypeRefs(...types: Type[]): void;
    getCreatedTypeByKey(typeName: string): Type<any>;
}
export declare const filterableMetadataStorage: FilterableMetadataStorage;
export {};
//# sourceMappingURL=filterable-metadata-storage.d.ts.map