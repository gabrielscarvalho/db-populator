import Parser from "../parser";
import moment from 'moment';
import { parserConfig } from "../../config";


export class ParserDatetime implements Parser {

    type: string = 'datetime';
    format: string = 'YYYY-MM-DD HH:mm:ss';

    static withFormat(format: string) : ParserDatetime {
        const parser :ParserDatetime = new ParserDatetime();
        parser.format = format;
        return parser;
    }

    parse(val: any): string {
        return parserConfig.addQuotes(moment(val).format(this.format));
    }
}

export default new ParserDatetime();