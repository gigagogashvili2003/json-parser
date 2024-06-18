export enum TokenType {
    LEFT_BRACE,
    RIGHT_BRACE,
    LEFT_BRACKET,
    RIGHT_BRACKET,
    COLON,
    COMMA,
    STRING,
    NUMBER,
    UNDEFINED,
    BOOLEAN,
    NULL,
    EOF,
}

export enum TokenTypeValue {
    LEFT_BRACE = '{',
    RIGHT_BRACE = '}',
    LEFT_BRACKET = '[',
    RIGHT_BRACKET = ']',
    COLON = ':',
    COMMA = ',',
    STRING = '"',
    TRUE = 'true',
    FALSE = 'false',
    UNDEFINED = 'undefined',
    NULL = 'null',
}
