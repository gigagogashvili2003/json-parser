import { TokenType } from '../enums';
import { IJsonParser, IToken } from '../interfaces';
import { JSONTokenizer } from '../tokenizer/json-tokenizer';

export class JSONParser implements IJsonParser {
    public constructor() {}

    public parse(json: string): any {
        const tokens: IToken[] = [];
        const tokenizer = new JSONTokenizer(json);
        let currentToken = tokenizer.getNextToken();

        while (currentToken.type !== TokenType.EOF) {
            tokens.push(currentToken);
            currentToken = tokenizer.getNextToken();
        }

        console.log(tokens);
    }
}
