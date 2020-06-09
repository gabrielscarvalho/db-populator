import Parser from "../parser";
import {ParserRaw} from "./parser-raw";


export class ParserFloat extends ParserRaw implements Parser {

    type: string = 'float';
    
    parse(val: any): string {

        if(this.params['decimals'] != undefined) {
            return parseFloat(val).toFixed(this.params['decimals']);
        }
        return String(val);
    }
}

export default new ParserFloat();