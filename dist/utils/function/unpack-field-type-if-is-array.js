"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpackFieldTypeIfIsArray = void 0;
function unpackFieldTypeIfIsArray(explicitFieldTypeFN) {
    if (!explicitFieldTypeFN) {
        return { fieldType: undefined, isArray: false };
    }
    const explicitFieldType = explicitFieldTypeFN();
    if (Array.isArray(explicitFieldType)) {
        const fieldType = explicitFieldType[0];
        return { fieldType, isArray: true };
    }
    return { fieldType: explicitFieldType, isArray: false };
}
exports.unpackFieldTypeIfIsArray = unpackFieldTypeIfIsArray;
//# sourceMappingURL=unpack-field-type-if-is-array.js.map