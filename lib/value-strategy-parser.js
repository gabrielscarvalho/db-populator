const _  = require('lodash');
const defaultStrategy = require('./default-value-strategy');

const QUOTE_CHAR = '"'
const NULL_STRING = 'null';


/**
 * Based in the type of the field, parse it to you, to create your insert.
*/
class ValueStrategyParser {


    /**
     * Which character will clousure every string? 
     * @param quoteChar the char that will enclousure every string on insert VALUES()
     * @param nullString the value used when the value is null or undefined
    */
    constructor(quoteChar = QUOTE_CHAR, nullString = NULL_STRING) {
        this.strategy = defaultStrategy(quoteChar, nullString);
        this.quoteChar = quoteChar;
        this.nullString = nullString;
    }


    /**
     * Wrap a string with the quote char.
     * use it to prepare string to be saved.
    */
    addQuotes(value){
        return this.quoteChar + value + this.quoteChar;
    }

    /**
     * Sets the string used to represent null values.
     * For example, for some dbs, null is put when the value is undefined.
     * @param string nullString
    */
    setNullString(nullString){
        this.nullString = nullString;
        this.strategy = defaultStrategy(this.quoteChar, nullString);
    }


    /**
     * Adds a new parser.
     * @param type string the type of the field
     * @param fn the fn that will parse - receives only a param, the value to be parsed - and return the value parsed.
     * @example:
     * addParser('datetime', (val) => return format(val, 'yyyy-MM-ddThh:mm')))
    */
    addParser(type, fn) {
        
        if(!_.isString(type) || !_.isFunction(fn)) {
            throw new Error(` Invalid creation of parser: [${type}]
            ---------------------------------    
            It expects a function as the second parameter.

            A valid example:

            insert.addParser('${type}', (val) => {
                return insert.addQuote('your prepared typed ' + val);
             });
            ---------------------------------
            `);
        }
        
        this.strategy[type] = fn;
    }


    apply(type, val) {
        if (typeof this.strategy[type] == 'function') {
            return this.strategy[type](val);
        }

        const validTypes = [];
        for(const key in this.strategy) {
            validTypes.push(key);
        }

        let errorMessage = `Error while applying parser type: ${type}.\n\n
        ------------------------------
         Unknown column.type: ${type}. \n
         Fix your json column choosing one of the recognized parsers:[ ${validTypes.join(',')} ].
         Or create another one:
         
         insert.addParser('${type}', (val) => {
            return insert.addQuote('your prepared typed ' + val);
         });
         
         Remember to fix your json!
         columnName : { type: '<your chosen parser code>', val: '...'  } <----------------
         ------------------------------ \n\n
        `;

        throw new Error(errorMessage);
    }

}




module.exports = ValueStrategyParser;