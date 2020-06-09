import DatabaseConfig, { ParserConfig } from "../config";



export interface Parser {
    type: string;
    config: ParserConfig;
    params: object;


    setConfig(config: ParserConfig): Parser;
    parse(val: any): string;
    addQuotes(val: any): string;
    getNullString(): string;
    setExtraParams(params: object);
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