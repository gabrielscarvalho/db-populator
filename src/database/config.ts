/**
 * Config some properties of your database
*/

export const queryProps : object = {
    QUOTE_CHAR : 'QUOTE_CHAR',
    NULL_VALUE_CONTENT: 'NULL_VALUE_CONTENT'
};


class DatabaseConfig {

    protected queries: Map<string, any> = new Map<string, any>() 
    constructor(){

        this.queries[queryProps['QUOTE_CHAR']] = `'`;
        this.queries[queryProps['NULL_VALUE_CONTENT']] = `null`;

    }

    setQueryParam(param: string, val: any) : DatabaseConfig {
        this.queries[param] = val;
        return this;
    }


    getQueryConfig() {
        return this.queries;
    }
}


export default DatabaseConfig;