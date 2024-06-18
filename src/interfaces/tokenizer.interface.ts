import { IToken } from './token.interface';

export interface ITokenizer {
    getNextToken(): IToken;
}
