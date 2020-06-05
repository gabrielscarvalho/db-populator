import Parser from "../parser";


export class ParserInteger implements Parser {

    type: "string";

    parse(val: any): string {
        throw new Error("Method not implemented.");
    }
    
}

export default ParserInteger;