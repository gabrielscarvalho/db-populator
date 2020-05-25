const GenericSQLBuilder = require('./db/GenericSQLBuilder');


const Insertable = require('./lib/insertable');
const dbStructure = require('./db-structure');

const initialIds = {
    't_customer': 30,
    't_address': 0,
    't_order': 0,
    't_order_item': 0
};


const insert = new Insertable(dbStructure);

insert.setInitialIds(initialIds);
insert.addParser('timestamp', (val) => ( 'TIMESTAMP '+ val))
insert.setNextIdStrategy((tableName, previousId) => {
    return --previousId;
});

insert.setQueryBuilder(GenericSQLBuilder);



module.exports=insert;

