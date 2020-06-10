import DatabaseConfig, { ParserConfig } from "../config";



export interface Parser {
    type: string;
    parse(val: any): string;
}

export default Parser;


/**
 * Wrapper to carry expecific data to the parser.
 * 
*/
export class ParserType {

    constructor(public name: string, public params: {}) {

    }

    static of(name: string, params: {}): ParserType {
        return new ParserType(name, params);
    }
}



export class ConfiguredParser {
    constructor(public parser: Parser, public params: {} ) {

    }
}