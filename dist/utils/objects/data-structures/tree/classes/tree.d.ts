import { TreeNode } from './tree-node';
interface InsertParams<T> {
    parentNodeKey: string;
    key: string;
    value: T;
    children?: TreeNode<T>[];
}
export declare class Tree<T> {
    private readonly root;
    constructor(key: string, value: T);
    preOrderTraversal(node?: TreeNode<T>): any;
    postOrderTraversal(node?: TreeNode<T>): any;
    insert(node: InsertParams<T>): TreeNode<T> | null;
    find(key: string): TreeNode<T>;
    getRoot(): TreeNode<T>;
}
export {};
//# sourceMappingURL=tree.d.ts.map