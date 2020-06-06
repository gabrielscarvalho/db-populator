import Parser from "../parser";
import {ParserRaw} from "./parser-raw";
import _ from 'lodash';

export class ParserBool extends ParserRaw implements Parser {

    type: string = 'bool';
    
    parse(val: any): string {
        return String(val);
    }
}

export default new ParserBool();