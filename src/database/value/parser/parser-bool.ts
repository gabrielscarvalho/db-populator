import Parser from "../parser";
import {ParserRaw} from "./parser-raw";


export class ParserBool extends ParserRaw implements Parser {

    type: string = 'bool';
    
    parse(val: any): string {
        return String(val);
    }
}

export default new ParserBool();