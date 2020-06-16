import Parser from "../parser";
import moment from 'moment';
import { parserConfig } from "../../config";


export class ParserDate implements Parser {

    type: string = 'date';
    format: string = 'YYYY-MM-DD';

    static withFormat(format: string): ParserDate {
        const parser: ParserDate = new ParserDate();
        parser.format = format;
        return parser;
    }


    parse(val: any, addQuotes = true): string {

        const dateString: string = moment(val).format(this.format);

        if(addQuotes) {
            return parserConfig.addQuotes(dateString);
        }
        return dateString;
    }
}

export default new ParserDate();

