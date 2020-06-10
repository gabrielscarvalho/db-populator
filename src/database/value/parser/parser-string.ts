import Parser from "../parser";
import { parserConfig } from "../../config";


export class ParserString implements Parser {

    type: string = 'string';


    parse(val: any): string {
        if(val != null && val != undefined){ 
            return parserConfig.addQuotes(String(val));
        }
        return parserConfig.getNullString();
    }
}

export default new ParserString();