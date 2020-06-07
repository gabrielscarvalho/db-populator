import DatabaseConfig, { ParserConfig } from "../config";



export interface Parser {
    type: string;
    config: ParserConfig;

    setConfig(config: ParserConfig): Parser;
    parse(val: any): string;
    addQuotes(val: any): string;
    getNullString(): string;
}

export default Parser;