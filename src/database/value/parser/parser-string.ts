import Parser from "../parser";
import {ParserRaw} from "./parser-raw";


export class ParserString extends ParserRaw implements Parser {

    type: string = 'string';


    parse(val: any): string {
        return this.addQuotes(String(val));
    }
}

export default new ParserString();