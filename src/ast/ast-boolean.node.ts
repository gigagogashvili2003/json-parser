import { ASTNode } from './ast-node';

export class ASTBooleanNode extends ASTNode<'Boolean', boolean> {
    public constructor(value: boolean) {
        super('Boolean', value);
    }
}
