export class TypeUtils {
    public static isString(val: any) {
        return typeof val === 'string';
    }

    public static isNumber(val: any) {
        return typeof val === 'number' && !isNaN(val);
    }

    public static isBoolean(val: any) {
        return typeof val === 'boolean';
    }

    public static isArray(val: any) {
        return Array.isArray(val);
    }

    public static isObject(val: any) {
        return val !== null && typeof val === 'object' && !Array.isArray(val);
    }

    public static isNull(val: any) {
        return val === null;
    }

    public static isUndefined(val: any) {
        return val === undefined;
    }
}
