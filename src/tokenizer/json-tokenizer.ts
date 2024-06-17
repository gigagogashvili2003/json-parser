import { TokenType } from '../enums';
import { IToken } from '../interfaces/token.interface';
import { ITokenizer } from '../interfaces/tokenizer.interface';
import { TypeUtils } from '../utils';

export class JSONTokenizer implements ITokenizer {
    public constructor(public json: string, public position: number = 0) {}

    public getNextToken(): IToken {
        const json = this.json.trim();

        while (this.position < json.length) {
            const character = json[this.position];

            switch (character) {
                case '{':
                    this.position++;
                    return { type: TokenType.LEFT_BRACE, value: character };
                case '}':
                    this.position++;
                    return { type: TokenType.RIGHT_BRACE, value: character };
                case '[':
                    this.position++;
                    return { type: TokenType.LEFT_BRACKET, value: character };
                case ']':
                    this.position++;
                    return { type: TokenType.RIGHT_BRACKET, value: character };
                case ':':
                    this.position++;
                    return this.readColon(character);
                case ',':
                    this.position++;
                    return this.readComa(character);
                case '"':
                    return this.readString();
                default:
                    if (this.isDigit(character)) {
                        return this.readNumber();
                    }
            }
        }

        return { type: TokenType.EOF, value: null };
    }

    public readColon(character: string): IToken {
        if (this.position >= this.json.length - 1) {
            throw new Error('You must say something after a colon');
        }

        return { type: TokenType.COMMA, value: character };
    }

    public readComa(character: string): IToken {
        if (this.position >= this.json.length - 1) {
            throw new Error('Invalid comma');
        }

        return { type: TokenType.COLON, value: character };
    }

    public readString(): IToken {
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

            if (this.isPositionAoutOfRange() && character !== '"') {
                throw new Error('Unterminated string');
            }
        }

        if (this.isPositionAoutOfRange() && this.json[this.position] !== '}') {
            throw new Error(`You must've to assign some value to ${str}`);
        }

        return { type: TokenType.STRING, value: str };
    }

    public readNumber(): IToken {
        let numStr = '';
        this.position++;

        while (this.position < this.json.length) {
            const character = this.json[this.position];
            if (!this.isDigit(character)) {
                break;
            }
            numStr += character;
            this.position++;
        }

        const isNumValid = TypeUtils.isNumber(Number(numStr));

        if (!isNumValid) {
            throw new Error('Invalid number');
        }

        return { type: TokenType.NUMBER, value: isNumValid };
    }

    private isPositionAoutOfRange() {
        return this.position >= this.json.length;
    }

    private isDigit(character: string) {
        return character >= '0' && character <= '9';
    }
}
