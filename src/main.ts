import { JSONParser } from './parser/json-parser';

const jsonParser = new JSONParser();

const value = jsonParser.parse('{"name":"Giga","age":25,"isStudent":false,"undefined":undefined,"null":null}');
const value2 = jsonParser.parse('{"name":"John","age":21,"isStudent":true,"undefined":undefined,"null":null}');

console.log(value, value2);
