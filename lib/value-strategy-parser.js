const Utils = require('./utils');
const _  = require('lodash');
const moment = require('moment');

const QUOTE_CHAR = '"'


/**
 * Throws an message to inform user that the variable he informed cannot be used.
 * @param variable - the value user has informed.
 * @param expectedType - string - the type it should have been informed.
 * @throws Error
*/
const throwInvalidType = (variable, expectedType) => {
    
    const realType = typeof variable;
    const msg = `Cannot parse the value: [${variable}] of type:[${realType}] to the expected type: [${expectedType}].
    Please verify your db structure to check if you are preparing it correctly.
    Example:

    const dbStructure = (id) => {

        'table_A' : {
            'column' : { type: '${expectedType}', val: '${variable}'} // fix the type or the value
        }
    }
    `;
    
    throw new Error(msg);
}

/**
 * Contains strategies to parse a value to db.
 * 
*/
const defaultStrategy = (QUOTE_CHAR, nullString = 'null') => ({

    'string': (val) => {

        if(_.isNull(val) || _.isUndefined(val)){
            return nullString;
        }

        if(_.isObject(val)) {
            throwInvalidType(val, 'string');
        }

        return QUOTE_CHAR + val + QUOTE_CHAR;
    },
    'raw': (val) => {
        
        if(_.isNull(val) || _.isUndefined(val)){
            return nullString;
        }

        if(_.isObject(val)) {
            throwInvalidType(val, 'raw');
        }        

        return _.toString(val);
    },
    'bool': (val) => {

        if(_.isNull(val) || _.isUndefined(val)){
            return nullString;
        }

        if(_.isObject(val) || (!_.isString(val) && !_.isBoolean(val))) {
            throwInvalidType(val, 'bool');
        }
        return _.toString(val);
    },
    'int': (val) => {
        if(_.isNull(val) || _.isUndefined(val)){
            return nullString;
        }

        if(_.isObject(val)) {
            throwInvalidType(val, 'int');
        }        
        try{
            const value = _.parseInt(val);
            if (_.isNaN(value)) {
                throw new Error();
            }
            return value;
        } catch (e) {
            throwInvalidType(val, 'int');
        }
    },
    'float': (val) => {
        if(_.isNull(val) || _.isUndefined(val)){
            return nullString;
        }
        try{
            const value = parseFloat(val);
            if (_.isNaN(value)) {
                throw new Error();
            }
            return value;
        } catch (e) {
            throwInvalidType(val, 'float');
        }
    },
    'datetime': (val) => {
        if(_.isNull(val) || _.isUndefined(val)){
            return nullString;
        }

        if (_.isString(val)) {
            return QUOTE_CHAR + val + QUOTE_CHAR;
        }
        if (_.isDate(val)) {
            return QUOTE_CHAR + moment(val).format('YYYY-MM-DD HH:mm:ss') + QUOTE_CHAR;
        }
        throwInvalidType(val, 'datetime');
    },

    'date': (val) => {
        
        if(_.isNull(val) || _.isUndefined(val)){
            return nullString;
        }

        if (_.isString(val) || _.isNull(val) || _.isUndefined(val)) {
            return QUOTE_CHAR + val + QUOTE_CHAR;
        }
        if (_.isDate(val)) {
            return QUOTE_CHAR + moment(val).format('YYYY-MM-DD') + QUOTE_CHAR;
        }
        throwInvalidType(val, 'date');
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
        
        if(typeof fn != 'function') {
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