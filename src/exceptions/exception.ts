
import colors from 'colors/safe';


class Exception {
    protected _table : string;
    protected _column: string;
    protected _prop: string;
    protected _example: string;

    protected _received: any;
    protected _expected: any;
    
    constructor (protected title: string, protected description: string = '') {}

    table(table: string) : Exception {
        this._table = table;
        return this;
    }

    column(table: string, column: string) : Exception {
        this._table = table;
        this._column = column;
        return this;
    }


    prop(table: string, column: string, prop: string) : Exception {
        this._table = table;
        this._column = column;
        this._prop = prop;
        return this;
    }

    value(expected: any, received: any) : Exception {
        this._expected = expected;
        this._received = received;
        return this;
    }


    example(example: string) : Exception {
        this._example = example;
        return this;
    }


    throw(){
        throw new Error(this.getMessage())
    }

    protected getMessage() : string {
        
        let identifier: string = ``;
        let example: string = '';
        let expectedReceived: string = '';

        if(this._table != undefined) {
            identifier = identifier + `table: [${colors.green(this._table)}] `;
        }

        if(this._column != undefined) {
            identifier = identifier + `column: [${colors.green(this._column)}] `;
        }
        
        if(this._prop != undefined) {
            identifier = identifier + `prop: [${colors.green(this._prop)}] `;
        }


        if(this._expected != undefined) {
            expectedReceived = `
            ${colors.bold('Received')} : [${colors.red(this._received)}]
            ${colors.bold('Expected')} : [${colors.green(this._expected)}]
            `;
        }

        if(this._example != undefined) {
            example = `${colors.bold('Example:')}
            ${colors.gray(colors.italic(this._example))}`;
        }

        return (`
        ${colors.bgMagenta(`-------------------------------------`)}
        ${colors.red(colors.bold('Error:'))} ${colors.bold(this.title)}
        ${identifier}: ${colors.italic(this.description)}${expectedReceived}
        ${example}
        ${colors.bgMagenta(`-------------------------------------`)}
        `);

    }

}

export default Exception;