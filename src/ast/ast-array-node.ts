import { ASTNode } from './ast-node';

export class ASTArrayNode extends ASTNode<'Array', Array<any>> {
    public constructor() {
        super('Array', []);
    }

    public push(value: any) {
        return this.value.push(value);
    }
}
