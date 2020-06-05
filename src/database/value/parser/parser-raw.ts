import Parser from "../parser";


export class ParserRaw implements Parser {

    type: string = 'raw';
    
    parse(val: any): string {
        return String(val);
    }

    addQuotes(val: string): string {
        return `'${val}'`;
    }
}

export default ParserRaw;