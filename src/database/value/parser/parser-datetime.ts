import Parser from "../parser";
import {ParserRaw} from "./parser-raw";
import moment from 'moment';


export class ParserDatetime extends ParserRaw implements Parser {

    type: string = 'datetime';
    
    parse(val: any): string {
        return this.addQuotes(moment(val).format('YYYY-MM-DD HH:mm:ss'));
    }
}

export default new ParserDatetime();