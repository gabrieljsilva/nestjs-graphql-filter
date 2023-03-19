"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
const tree_node_1 = require("./tree-node");
class Tree {
    constructor(key, value) {
        this.root = new tree_node_1.TreeNode({ key, value, children: [] });
    }
    *preOrderTraversal(node = this.root) {
        yield node;
        if (node.children.length) {
            for (const child of node.children) {
                yield* this.preOrderTraversal(child);
            }
        }
    }
    *postOrderTraversal(node = this.root) {
        if (node.children.length) {
            for (const child of node.children) {
                yield* this.postOrderTraversal(child);
            }
        }
        yield node;
    }
    insert(node) {
        const { parentNodeKey, key, value, children } = node;
        const parentNode = this.find(parentNodeKey);
        const treeNode = new tree_node_1.TreeNode({
            key,
            value,
            parent: parentNode,
            children,
        });
        parentNode === null || parentNode === void 0 ? void 0 : parentNode.children.push(treeNode);
        return null;
    }
    find(key) {
        for (const node of this.preOrderTraversal()) {
            if (node.key === key)
                return node;
        }
        return undefined;
    }
    getRoot() {
        return this.root;
    }
}
exports.Tree = Tree;
//# sourceMappingURL=tree.js.map