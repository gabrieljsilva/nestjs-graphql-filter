"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClassRef = void 0;
function createClassRef(name) {
    const assertionRef = { [name]: class {
        } };
    return assertionRef[name];
}
exports.createClassRef = createClassRef;
//# sourceMappingURL=create-class-ref.js.map