/**
 * Config some properties of your database
*/

class ParserConfig {

    public QUOTE_CHAR: string = `'`;
    public NULL_TEXT: string = `null`;



     
    addQuotes(val: string): string {
        const quote = this.QUOTE_CHAR;
        return `${quote}${val}${quote}`;
    }

    getNullString(): string {
        return this.NULL_TEXT;
    }

}

export class DatabaseConfig {

    public parserConfig: ParserConfig = new ParserConfig(); 
}


export const parserConfig = new ParserConfig();

export default DatabaseConfig;