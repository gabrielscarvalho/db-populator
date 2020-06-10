import Parser from "../parser";

export class ParserFloat implements Parser {

    type: string = 'float';
    precision: number = undefined;


    static withPrecision(precision: number) : ParserFloat {
        const parser :ParserFloat = new ParserFloat();
        parser.precision = precision;
        return parser;
    }

   
    parse(val: any): string {
        if(this.precision != undefined) {
            return parseFloat(val).toFixed(this.precision);
        }
        return String(val);
    }
}

export default new ParserFloat();