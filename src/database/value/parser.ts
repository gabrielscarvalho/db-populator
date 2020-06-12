import _ from 'lodash';
import { parserConfig } from '../config';


export interface Parser {
    type: string;
    parse(val: any): string;
}

export default Parser;


export const isParser = (instance: object): boolean => {
    return (_.isString(instance['type']) && _.isFunction(instance['parse']));
}

export class ParserHelper {

    addQuotes(val) {
        return parserConfig.addQuotes(val);
    }

    getNullString() {
        return parserConfig.getNullString();
    }
}



export const ParserBuilder = (type: string, fn: Function) : Parser  => {

    const clazz = class CustomParser extends ParserHelper implements Parser {

        constructor(public type: string, protected fn: Function) {
            super();
        }
        
        parse(val: any) {
            return this.fn(val, this);
        }
    } 
    return new clazz(type, fn);
}