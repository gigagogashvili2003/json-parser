import { ASTNode } from './ast-node';

export class ASTUndefinedNode extends ASTNode<'Undefined', undefined> {
    public constructor(value: undefined) {
        super('Undefined', value);
    }
}
