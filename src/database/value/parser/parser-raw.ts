import Parser from "../parser";
import { ParserConfig } from "../../config";


export class ParserRaw implements Parser {

    type: string = 'raw';
    config: ParserConfig;
    params: object = {};

    setConfig(config: ParserConfig): ParserRaw {
        this.config = config;
        return this;
    }

    parse(val: any): string {
        return String(val);
    }

    addQuotes(val: string): string {
        const quote = this.config.QUOTE_CHAR;
        return `${quote}${val}${quote}`;
    }

    getNullString(): string {
        return this.config.NULL_TEXT;
    }


    setExtraParams(params :object = {}) {
        this.params = params;
    }
}

export default new ParserRaw();