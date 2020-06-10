import Parser from "../parser";


export class ParserInt implements Parser {

    type: string = 'int';
    
    parse(val: any): string {
        return String(val);
    }
}

export default new ParserInt();