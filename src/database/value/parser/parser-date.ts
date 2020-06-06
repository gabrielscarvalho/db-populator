import Parser from "../parser";
import {ParserRaw} from "./parser-raw";
import moment from 'moment';


export class ParserDate extends ParserRaw implements Parser {

    type: string = 'date';
    
    parse(val: any): string {
        return this.addQuotes(moment(val).format('YYYY-MM-DD'));
    }
}

export default new ParserDate();