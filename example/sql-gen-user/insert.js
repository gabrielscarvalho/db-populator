const configure = require('db-populator/lib/insert');
const id = require('db-populator/lib/id');
const GenericSQLBuilder = require('db-populator/db/GenericSQLBuilder');
const ValueStrategyParser = require('db-populator/lib/value-strategy-parser');

const dbStructure = require('./db-structure');

const initialIds = {
    't_customer': 0,
    't_address': 100,
    't_order': 200,
    't_order_item': 1500
};


const valueStrategyParser = new ValueStrategyParser("'");// the unified quote symbol

/* Uncomment the following code to see that you are able to create or replace types!
valueStrategyParser.addParser('string', (val) =>  {
  //format val as you wish
  return valueStrategyParser.quoteChar + 'my string '+ val + valueStrategyParser.quoteChar;
});
*/


id.setInitialIds(initialIds, (tableName, previousId) => {
    // you are able to define the rules to choose next id to each table.
    if(tableName == 't_customer') {
        return --previousId;
    }

    return ++previousId;
})

module.exports = configure(new GenericSQLBuilder(dbStructure(id), valueStrategyParser));