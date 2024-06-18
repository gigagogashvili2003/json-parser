export abstract class ASTNode<T, V> {
    public constructor(public type: T, public value: V) {}
}
