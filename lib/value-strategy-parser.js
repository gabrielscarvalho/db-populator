const Utils = require('./utils');

const QUOTE_CHAR = '"'





/**
 * Contains strategies to parse a value to db.
 * 
*/
const defaultStrategy = (QUOTE_CHAR) => ({

    'string': (val) => {

        return QUOTE_CHAR + val + QUOTE_CHAR;
    },
    'raw': (val) => {
        return val;
    },
    'bool': (val) => {
        return val;
    },
    'int': (val) => {

        return parseInt(val);
    },
    'float': (val) => {
        return parseFloat(val);
    },
    'datetime': (val) => {
        if (typeof val == 'string') {
            return QUOTE_CHAR + val + QUOTE_CHAR;
        }
        if (typeof val == 'object') {

            const year = val.getFullYear();
            const month = Utils.LeftPadWithZeros((val.getMonth() + 1), 2);
            const day = Utils.LeftPadWithZeros(val.getDate(), 2);
            const hour = Utils.LeftPadWithZeros(val.getHours(), 2);
            const minutes = Utils.LeftPadWithZeros(val.getMinutes(), 2);
            const seconds = Utils.LeftPadWithZeros(val.getSeconds(), 2);

            return QUOTE_CHAR + year + '-' + month + '-' + day + 'T' + hour + ':' + minutes + ':' + seconds + QUOTE_CHAR;
        }
    },
    'date': (val) => {
        if (typeof val == 'string') {
            return QUOTE_CHAR + val + QUOTE_CHAR;
        }
        if (typeof val == 'object') {

            const year = val.getFullYear();
            const month = Utils.LeftPadWithZeros((val.getMonth() + 1), 2);
            const day = Utils.LeftPadWithZeros(val.getDate(), 2);
            return QUOTE_CHAR + year + '-' + month + '-' + day + QUOTE_CHAR;
        }
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
     * Wrap a string with the quote char.
     * use it to prepare string to be saved.
    */
    addQuotes(value){
        return this.quoteChar + value + this.quoteChar;
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
        if (typeof this.strategy[type] == 'function') {
            return this.strategy[type](val);
        }
        throw new Error('unknown type: ', type);
    }

}




module.exports = ValueStrategyParser;