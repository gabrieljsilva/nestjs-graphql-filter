"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeNode = void 0;
class TreeNode {
    constructor(node) {
        var _a;
        this.key = node.key;
        this.value = node.value;
        this.parent = node.parent;
        this.children = (_a = node.children) !== null && _a !== void 0 ? _a : [];
    }
    isLeaf() {
        return this.children.length === 0;
    }
}
exports.TreeNode = TreeNode;
//# sourceMappingURL=tree-node.js.map