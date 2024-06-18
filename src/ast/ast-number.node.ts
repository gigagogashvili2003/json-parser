import { ASTNode } from './ast-node';

export class ASTNumberNode extends ASTNode<'Number', number> {
    public constructor(value: number) {
        super('Number', value);
    }
}
