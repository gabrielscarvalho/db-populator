import Parser from "../parser";
import _ from 'lodash';

export class ParserBool implements Parser {

    type: string = 'bool';
    
    parse(val: any): string {
        return String(val);
    }
}

export default new ParserBool();