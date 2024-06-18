import { JSONParser } from './parser/json-parser';

const jsonParser = new JSONParser();

const value = jsonParser.parse('{"name":"John","children":["Giga","Zack",{"name":"Jack","children":["Giga"]}]}');
