export declare class TreeNode<T> {
    key: string;
    value: T;
    parent: TreeNode<T>;
    children: TreeNode<T>[];
    constructor(node: Partial<TreeNode<any>>);
    isLeaf(): boolean;
}
//# sourceMappingURL=tree-node.d.ts.map