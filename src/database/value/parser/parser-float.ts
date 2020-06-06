import Parser from "../parser";
import {ParserRaw} from "./parser-raw";


export class ParserFloat extends ParserRaw implements Parser {

    type: string = 'float';
    
    parse(val: any): string {
        return String(val);
    }
}

export default new ParserFloat();