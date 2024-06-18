import { ASTNode } from './ast-node';

export class ASTArrayNode extends ASTNode<'Array', []> {
    public constructor() {
        super('Array', []);
    }
}
