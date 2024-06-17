export interface IJsonParser {
    parse(json: string): Record<string, any>;
}
