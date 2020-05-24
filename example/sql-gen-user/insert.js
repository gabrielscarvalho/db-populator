const configure = require('db-populator/lib/insert');
const id = require('db-populator/lib/id');
const GenericSQLBuilder = require('db-populator/db/GenericSQLBuilder');

const dbStructure = require('./db-structure');

const initialIds = {
    't_customer': 30,
    't_address': 0,
    't_order': 0,
    't_order_item': 0
};


id.setInitialIds(initialIds, (table, previousId) => {
    // you are able to define the rules to choose next id to each table.
    return --previousId;
})

module.exports = configure(new GenericSQLBuilder(dbStructure(id)));