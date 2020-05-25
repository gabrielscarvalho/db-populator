//const GenericSQLBuilder = require('./db/GenericSQLBuilder');


const Insertable = require('./lib/insertable');
const dbStructure = require('./db-structure');

const initialIds = {
    't_customer': 30,
    't_address': 0,
    't_order': 0,
    't_order_item': 0
};


const insert = new Insertable(dbStructure, initialIds);


//Another way to set the initialIds
//insert.setInitialIds(initialIds);

//add new parsers or replace the actual
//insert.addParser('my-special-type', (val) => (insert.parserWrapString('timestamp '+ val)))


//set the next id strategy
/*insert.setNextIdStrategy((tableName, previousId) => {
    return --previousId;
});*/

//add your own query builder.
//insert.setQueryBuilder(GenericSQLBuilder);



module.exports=insert;

