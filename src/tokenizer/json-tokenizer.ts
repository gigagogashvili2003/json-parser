import { TokenType, TokenTypeValue } from '../enums';
import { InvalidInputError } from '../errors';
import { IToken } from '../interfaces/token.interface';
import { ITokenizer } from '../interfaces/tokenizer.interface';
import { TypeUtils } from '../utils';

export class JSONTokenizer implements ITokenizer {
    public constructor(private json: string, private position: number = 0) {}

    public getNextToken(): IToken {
        const json = this.json.trim();

        while (this.position < json.length) {
            const character = json[this.position];

            switch (character) {
                case TokenTypeValue.LEFT_BRACE:
                    return this.readLeftBrace(character);
                case TokenTypeValue.RIGHT_BRACE:
                    return this.readRightBrace(character);
                case TokenTypeValue.LEFT_BRACKET:
                    return this.readLeftBracket(character);
                case TokenTypeValue.RIGHT_BRACKET:
                    return this.readRightBracket(character);
                case TokenTypeValue.COLON:
                    return this.readColon(character);
                case TokenTypeValue.COMMA:
                    return this.readComma(character);
                case TokenTypeValue.STRING:
                    return this.readString();
                default:
                    if (this.isDigit(character)) {
                        return this.readNumber();
                    } else if (this.isBoolean()) {
                        return this.readBoolean();
                    } else if (this.isUndiefined()) {
                        return this.readUndefined();
                    } else if (this.isNull()) {
                        return this.readNull();
                    } else {
                        throw new InvalidInputError('Invalid character');
                    }
            }
        }

        return { type: TokenType.EOF, value: null };
    }

    private readBoolean(): IToken {
        const remainingJSon = this.getRemainingJson();
        if (remainingJSon.startsWith(TokenTypeValue.TRUE)) {
            this.position += 4;
            return { type: TokenType.BOOLEAN, value: true };
        } else {
            this.position += 5;
            return { type: TokenType.BOOLEAN, value: false };
        }
    }

    private readUndefined(): IToken {
        this.position += 9;
        return { type: TokenType.UNDEFINED, value: undefined };
    }

    private readNull(): IToken {
        this.position += 4;
        return { type: TokenType.NULL, value: null };
    }

    private readLeftBrace(character: string): IToken {
        this.position++;
        return { type: TokenType.LEFT_BRACE, value: character };
    }

    private readRightBrace(character: string): IToken {
        this.position++;
        return { type: TokenType.RIGHT_BRACE, value: character };
    }

    private readLeftBracket(character: string): IToken {
        this.position++;
        return { type: TokenType.LEFT_BRACKET, value: character };
    }

    private readRightBracket(character: string): IToken {
        this.position++;
        return { type: TokenType.RIGHT_BRACKET, value: character };
    }

    private readColon(character: string): IToken {
        this.position++;
        return { type: TokenType.COMMA, value: character };
    }

    private readComma(character: string): IToken {
        this.position++;
        return { type: TokenType.COMMA, value: character };
    }

    private readString(): IToken {
        let str = '';
        this.position++;

        while (this.position < this.json.length) {
            const character = this.json[this.position];

            if (character === '"') {
                this.position++;
                break;
            }

            str += character;
            this.position++;
        }

        return { type: TokenType.STRING, value: str };
    }

    private readNumber(): IToken {
        let numStr = '';

        while (this.position < this.json.length) {
            const character = this.json[this.position];

            if (!this.isDigit(character)) {
                break;
            }
            numStr += character;
            this.position++;
        }
        const convertedNum = Number(numStr);
        const isNumValid = TypeUtils.isNumber(convertedNum);

        if (!isNumValid) {
            throw new InvalidInputError('Invalid number');
        }

        return { type: TokenType.NUMBER, value: convertedNum };
    }

    private isBoolean() {
        const remainingJSon = this.getRemainingJson();
        return remainingJSon.startsWith(TokenTypeValue.TRUE) || remainingJSon.startsWith(TokenTypeValue.FALSE);
    }

    private isUndiefined() {
        const remainingJSon = this.getRemainingJson();
        return remainingJSon.startsWith(TokenTypeValue.UNDEFINED);
    }

    private isNull() {
        const remainingJSon = this.getRemainingJson();
        return remainingJSon.startsWith(TokenTypeValue.NULL);
    }

    private getRemainingJson() {
        return this.json.substring(this.position);
    }

    private isDigit(character: string) {
        return character >= '0' && character <= '9';
    }

    public getPosition() {
        return this.position;
    }

    public getJson() {
        return this.json;
    }

    public setPosition(position: number) {
        return (this.position = position);
    }
}
