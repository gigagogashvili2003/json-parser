import { ASTNode } from './ast-node';

export class ASTObjectNode extends ASTNode<'Object', Record<string, any>> {
    public constructor() {
        super('Object', new Object());
    }

    public addProperty(key: string, value: any) {
        this.value[key] = value;
    }
}
