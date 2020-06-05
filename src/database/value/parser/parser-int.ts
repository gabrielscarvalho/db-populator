import Parser from "../parser";
import {ParserRaw} from "./parser-raw";


export class ParserInt extends ParserRaw implements Parser {

    type: string = 'int';
    
    parse(val: any): string {
        return String(val);
    }
}

export default new ParserInt();