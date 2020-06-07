/**
 * Config some properties of your database
*/

export class ParserConfig {

    public QUOTE_CHAR: string = `'`;
    public NULL_TEXT: string = `null`;
}

export class DatabaseConfig {

    public parserConfig: ParserConfig = new ParserConfig(); 
}


export default DatabaseConfig;