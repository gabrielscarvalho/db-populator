const _  = require('lodash');


/**
 * Generates your data row, based on your db-structure
*/
class DataRowGenerator {

    /**
     * Receives the table data.
     * Especific the value of your table in db-structure.
     * 
     * @param dataGen the table data mapped in db-structure
     * @example
     * dbStructure = (id) => {
     *  't_customer' => { 'field' : {type:'...', val: '...'}} //the object of t_customer is what this class expects.
     * }
     */
    constructor(dataGen){
        this.dataGen = dataGen;
    }

    /**
     * Generates your data.
     * @param extraData object optional - in case you want to add something to the object
     * @return object 
     * @example
     * {
     *  simpleResult: { id: 3, name: 'John', ...}, //used as the return of insert.add(...)
     *  completeResult: { id: { column: 'customer_id', val: 'John', type: 'string'}}  // used as param of GenericSQLBuilder
     * }
     * 
     */
    generateData(extraData) {
    
        let result = {};
        let completeResult = {}

        for(const prop in this.dataGen) {

            let value = this.dataGen[prop].val; 
            let type = this.dataGen[prop].type;
            let column = this.dataGen[prop].column ? this.dataGen[prop].column : prop;

            if(_.isFunction(value)){
                value = value();
            }

            if(_.isObject(extraData) && !_.isUndefined(extraData[prop])) {
                value =  typeof extraData[prop] == 'function' ? extraData[prop]() : extraData[prop];
            }

            result[prop] = value;
            completeResult[column] = { type, val: value, column }

        }
        return { simpleResult: result, completeResult: completeResult } ;
    }

}


module.exports=DataRowGenerator;