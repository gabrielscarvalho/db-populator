const _  = require('lodash');
const moment = require('moment');
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
const defaultStrategy = (QUOTE_CHAR, nullString) => ({

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

module.exports=defaultStrategy;