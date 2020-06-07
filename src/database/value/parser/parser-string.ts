import Parser from "../parser";
import {ParserRaw} from "./parser-raw";


export class ParserString extends ParserRaw implements Parser {

    type: string = 'string';


    parse(val: any): string {
        if(val != null && val != undefined){ 
            return this.addQuotes(String(val));
        }
        return this.getNullString();
    }
}

export default new ParserString();