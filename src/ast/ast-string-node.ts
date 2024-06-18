import { ASTNode } from './ast-node';

export class ASTStringNode extends ASTNode<'String', string> {
    public constructor(value: string) {
        super('String', value);
    }
}
