import { ASTArrayNode, ASTNullNode, ASTNumberNode, ASTObjectNode, ASTStringNode, ASTUndefinedNode } from '../ast';
import { ASTBooleanNode } from '../ast/ast-boolean.node';
import { TokenType } from '../enums';
import { IJsonParser, IToken } from '../interfaces';
import { JSONTokenizer } from '../tokenizer/json-tokenizer';
import { TypeUtils } from '../utils';

export class JSONParser implements IJsonParser {
    public constructor() {}

    public parse(json: string): any {
        const tokenizer = new JSONTokenizer(json);
        let currentToken = tokenizer.getNextToken();
        let value;

        if (currentToken.type !== TokenType.LEFT_BRACE) {
            throw new Error('Expected object');
        }

        while (currentToken.type !== TokenType.EOF) {
            value = this.parseValueBaseOnType(currentToken, tokenizer);
            currentToken = tokenizer.getNextToken();
        }

        return value;
    }

    public parseValueBaseOnType(currentToken: IToken, tokenizer: JSONTokenizer) {
        switch (currentToken.type) {
            case TokenType.LEFT_BRACE:
                return this.parseObject(currentToken, tokenizer);
            case TokenType.LEFT_BRACKET:
                return this.parseArray(currentToken, tokenizer);
            case TokenType.STRING:
                return this.parseString(currentToken);
            case TokenType.NUMBER:
                return this.parseNumber(currentToken);
            case TokenType.BOOLEAN:
                return this.parseBoolean(currentToken);
            case TokenType.NULL:
                return this.parseNull(currentToken);
            case TokenType.UNDEFINED:
                return this.parseUndefined(currentToken);
            default:
                throw new Error('Invalid token');
        }
    }

    public parseObject(currentToken: IToken, tokenizer: JSONTokenizer) {
        const newASTObjectNode = new ASTObjectNode();

        while (currentToken.type !== TokenType.RIGHT_BRACE) {
            currentToken = tokenizer.getNextToken();

            if (currentToken.type === TokenType.RIGHT_BRACE) {
                break;
            }

            const key = this.parseKey(currentToken);

            currentToken = tokenizer.getNextToken();
            const value = this.parseValue(tokenizer.getNextToken(), tokenizer);

            newASTObjectNode.addProperty(key, value);
            currentToken = tokenizer.getNextToken();

            if (currentToken.type === TokenType.COMMA) {
                continue;
            }
        }

        return newASTObjectNode;
    }

    public parseArray(currentToken: IToken, tokenizer: JSONTokenizer) {
        const newASTArrayNode = new ASTArrayNode();

        while (currentToken.type !== TokenType.RIGHT_BRACKET) {
            currentToken = tokenizer.getNextToken();
            if (currentToken.type === TokenType.RIGHT_BRACKET) {
                break;
            }

            if (currentToken.type === TokenType.COMMA) {
                continue;
            }

            const value = this.parseValue(currentToken, tokenizer);
            newASTArrayNode.push(value);
        }

        return newASTArrayNode;
    }

    private parseKey(currentToken: IToken) {
        if (currentToken.type !== TokenType.STRING) {
            new Error('Expected string as a key');
        }

        return currentToken.value;
    }

    public parseString(currentToken: IToken) {
        if (currentToken.type !== TokenType.STRING) {
            new Error('Expected string');
        }
        return new ASTStringNode(currentToken.value);
    }

    private parseValue(currentToken: IToken, tokenizer: JSONTokenizer) {
        return this.parseValueBaseOnType(currentToken, tokenizer);
    }

    public parseNumber(currentToken: IToken) {
        if (currentToken.type !== TokenType.NUMBER || !TypeUtils.isNumber(currentToken.value)) {
            new Error('Expected number');
        }

        return new ASTNumberNode(currentToken.value);
    }

    public parseBoolean(currentToken: IToken) {
        if (currentToken.type !== TokenType.BOOLEAN || !TypeUtils.isBoolean(currentToken.value)) {
            new Error('Expected boolean');
        }
        return new ASTBooleanNode(currentToken.value);
    }

    public parseNull(currentToken: IToken) {
        if (currentToken.type !== TokenType.NULL || !TypeUtils.isNull(currentToken.value)) {
            new Error('Expected null');
        }
        return new ASTNullNode(currentToken.value);
    }

    public parseUndefined(currentToken: IToken) {
        if (currentToken.type !== TokenType.UNDEFINED || !TypeUtils.isUndefined(currentToken.value)) {
            new Error('Expected undefined');
        }

        return new ASTUndefinedNode(currentToken.value);
    }
}
