

const QUOTE_CHAR = '"'

/**
 * Contains strategies to parse a value to db.
 * 
*/
const defaultStrategy = (QUOTE_CHAR) =>  ({

    'string' : (val) => {

        return QUOTE_CHAR + val + QUOTE_CHAR;
    },
    'int' : (val) => {

        return  parseInt(val);
    }
});


/**
 * Based in the type of the field, parse it to you, to create your insert.
*/
class ValueStrategyParser {


    /**
     * Which character will clousure every string? 
    */
    constructor(quoteChar = QUOTE_CHAR) {
        this.strategy = defaultStrategy(quoteChar);
        this.quoteChar = quoteChar;
    }

    /**
     * Adds a new parser.
     * @param type string the type of the field
     * @param fn the fn that will parse - receives only a param, the value to be parsed - and return the value parsed.
     * @example:
     * addParser('datetime', (val) => return format(val, 'yyyy-MM-ddThh:mm')))
    */
    addParser(type, fn) {
        this.strategy[type] = fn;
    }


    apply(type, val) {
        if(typeof this.strategy[type] == 'function') {
            return this.strategy[type](val);
        }
        throw new Error('unknown type: ', type);
    }

}




module.exports = ValueStrategyParser;