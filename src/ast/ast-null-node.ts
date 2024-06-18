import { ASTNode } from './ast-node';

export class ASTNullNode extends ASTNode<'Null', null> {
    public constructor(value: null) {
        super('Null', value);
    }
}
