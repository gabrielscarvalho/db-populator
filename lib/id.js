

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
        this.currentIds = initialIds;
        //todo: make it private properly.
        this.private = {};

        const defaultNextIDStrategy = (table, previousID) => (++previous);

        this.private.getNextIdStrategy = getNextIdStrategy || defaultNextIDStrategy;
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
            }

            return currentIds[tableName];
        }
    }

}


module.exports = Id;