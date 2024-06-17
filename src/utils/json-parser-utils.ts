import { TypeUtils } from './type-utils';

export class JSONParserUtils {
    public static isValidJSON(json: string) {
        const isString = TypeUtils.isString(json);

        if (!isString) {
            throw new Error('JSON should be a string');
        }
    }
}
