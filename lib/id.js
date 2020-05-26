const Random = require('./random');

/**
 * Deal with the id generation
 * */
class Id {



    /**
     * Receives 2 params:
     * initialIds: a list of { table_name :  initial_id_value }
     * getNextIdStrategy a fn like this:
     * 
     * //todo: allow it to be null, and a function will return value +1
     * const getNextId = (table, previousId) => {
     *    return previousId++; // if table == 'order', return in other way.
     * } 
     * 
     * */
    constructor(initialIds, getNextIdStrategy) {
        this.setInitialIds(initialIds, getNextIdStrategy);
        this.randomCodes = {};
    }


    setInitialIds(initialIds, getNextIdStrategy){
        this.currentIds = initialIds || {};
        //todo: make it private properly.
        this.private = {};

        const defaultNextIDStrategy = (table, previousID) => (++previousID);

        this.setNextIdStrategy(getNextIdStrategy || defaultNextIDStrategy);
    }


    /**
     * Sets the strategy to get the next id.
     * @param fn a fn with 2 params: tableName, previousID 
     * @example  (tableName, previousId) =>  {
     *     if(tableName == 't_customer') {
     *       return previousId + 10;
     *    }
     *    return 1;
     * 
     * }
     * That will make that the id of your customer table, to increase 10 at each new insert.
    */
    setNextIdStrategy(fn) {

        if(typeof fn != 'function') {
            throw new Error(` Invalid creation of strategy to choose nextID!
            ---------------------------------    
            It expects a function as parameter.

            A valid example:

            insert.setNextIdStrategy((tableName, previousId) => {
                if(tableName == 't_customer') {
                    return previousId + 3;  
                }
                return previousId+1;
             });
            ---------------------------------
            `);
        }
        this.private.getNextIdStrategy = fn;
    }


    /**
     * Creates and track a new random code 
     * @param fieldName string the unique identifier on the entire project to this field.
     * @param prefix string a prefix to be added to the random code.
     * @param lengthRandom int the length of the random string. This value is limited to 12 until 1.0.11 version.
     * @return a fn that will return the next random code.
    */
    getNextRandomCode(fieldName, prefix = undefined, lengthRandom = 5) {
        if(prefix == null || prefix == 'undefined'){
            prefix = fieldName;
        }
        return () => {
            this.randomCodes[fieldName] = Random.string(`${prefix}:`, lengthRandom)();
            return this.randomCodes[fieldName];
        }
    }

    /**
     * Returns the current random code for the informed field.
     * @return a fn that will return the last created code.
    */
    getCurrentCode(fieldName){
        let self = this;
        return () => {
            return self.randomCodes[fieldName];
        }
    }

    /**
     * Returns a fn that will return the next id to the informed table.
     * @return a fn. when executed, return the id.
    */
    getNext(tableName) {

        const currentIds = this.currentIds;
        const getNextIdStrategy = this.private.getNextIdStrategy;


        return () => {
            if (!currentIds[tableName]) {
                currentIds[tableName] = 0;
                console.log(`Could not find the initialID of ${tableName}. Using id=0`)
            }

            const currentID = getNextIdStrategy(tableName, currentIds[tableName]);

            currentIds[tableName] = currentID;
            return currentID;
        }
    }

    /**
     * Returns a fn that will return the current id to the informed table.
     * @return a fn. when executed, return the id.
    */
    getCurrent(tableName) {

        const currentIds = this.currentIds;

        return () => {
            if (!currentIds[tableName]) {
                currentIds[tableName] = 0;
                console.log(`Could not find the initialID of ${tableName}. Using id=0`)
            }

            return currentIds[tableName];
        }
    }

}


module.exports = new Id({});