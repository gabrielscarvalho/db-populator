
const id = require('./id');
const ValueStrategyParser = require('./value-strategy-parser');
const Table = require('./table');
const GenericSQLBuilder = require('../db/GenericSQLBuilder');



/**
 * Insert Generator lib!
 * @author gabrielsc
*/
class Insertable {


    /**
     * Expect 2 params
     * @param dbStructureFn  fn
     * @param initialIds optional object
     * 
     * @example
     * id is the object from lib/id - a simple lib that helps to deal with ids
     * dbStructureFn = (id) => {
     *   return {
     *     't_customer' : {
     *         'id': { type: 'int', val: id.getNext('t_customer')},
     *         'name: {type: 'string', val: 'John'}
     *      },
     *    't_address': {
     *        'customer_id': {type: 'int', val: id.getCurrent('t_customer')}
     *      }
     *   }
     * }
     * initialIds = {
     *    't_customer' : 100, // the first id will be 101
     *    't_address': 40
     * 
     * } 
     * 
    */
    constructor(dbStructureFn, initialIds = {}){
        this.id = id;
        this.id.setInitialIds(initialIds);
        this.dbStructureFn = dbStructureFn;
        
        this.valueStrategyParser = new ValueStrategyParser("'")
        
        this.dbStructure = undefined;

        this.queryBuilderClass = GenericSQLBuilder;
        this.queryBuilder = undefined;


        this.sqls = [];
        this.objects = [];
        this.completeObjects = [];
    }



    /**
     * Set the new query builder;
     * Use it if the GenericSQLBuilder does not help you.
     * 
     * Create your own based on GenericSQLBuilder.
     * 
    */
    setQueryBuilder(clazz) {
        this.queryBuilderClass = clazz;
        this.queryBuilder = undefined;
    }


    /**
     * Get the class that will create the inserts.
     * Pass to it 2 args:
     * - the db structure and the strategy to parse every type.
    */
    getQueryBuilder(){
        if(this.queryBuilder == undefined || this.queryBuilder == null ) {
            this.queryBuilder = new this.queryBuilderClass(this.getDbStructure(), this.valueStrategyParser);
        }
        return this.queryBuilder;
    }

    /**
     * Return the prepared dbstructure.
     * @return object
    */
    getDbStructure(){
        if(this.dbStructure == null || this.dbStructure == undefined) {
            this.dbStructure = this.dbStructureFn(this.id);
        }

        return this.dbStructure;
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
        this.id.setNextIdStrategy(fn);
    }


    /**
     * Updates the char used to split string values.
     * 
     * ex: 
     * quoteCharSeparator = 'H';
     *  insert into ... values (1, Hyour stringH, ...)
     *  Obviously, you should use to set as ' or "
    */
    useStringQuoteSeparator(quoteCharSeparator){
        this.valueStrategyParser.quoteChar = quoteCharSeparator;
    }

    /**
     * Set the initial ids of your tables.
     * @example: { 't_customer' : 100, 't_address': 200}
    */
    setInitialIds(initialIds) {
        this.id.setInitialIds(initialIds);       
    }

    /**
     * Adds a new parser.
     * @param type string the type of the field
     * @param fn the fn that will parse - receives only a param, the value to be parsed - and return the value parsed.
     * @example:
     * addParser('datetime', (val) => return format(val, 'yyyy-MM-ddThh:mm')))
    */
    addParser(type, fn) {
        this.valueStrategyParser.addParser(type, fn);
    }


    /**
     * Creates a new insert.
     * 
     * @param string tableName
     * @param object extraData optional
     * 
     * @example: add('t_customer', {email: 'john@gmail.com'})
    */
    add(tableName, extraData) {
        const table = new Table(this.getDbStructure()[tableName]);
        const data = table.generateData(extraData);

        this.sqls.push(this.getQueryBuilder().insert(tableName, data.completeResult));

        this.objects.push({tableName, object: data.simpleResult});
        this.completeObjects.push({tableName, object:data.completeResult});
        return data.simpleResult;
    }
    
    /**
     * Prints all the saved SQLs
     * @return void;
    */
    printSQLs() {
        console.log('Result SQLs:');
        this.sqls.forEach(sql => console.log(sql));
    }

}

module.exports = Insertable;