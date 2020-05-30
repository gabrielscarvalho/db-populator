const Insertable = require('db-populator/lib/insertable');

//const MyOwnQueryBuilder = require('./MyOwnQueryBuilder');
const dbStructure = require('./db-structure');

const initialIds = {
    't_customer': 0,
    't_address': 100,
    't_order': 200,
    't_order_item': 1500
};

const insert = new Insertable(dbStructure, initialIds);


//Another way to set the initialIds (optional)
insert.setInitialIds(initialIds);

//add new parsers or replace the actual (optional)
insert.addParser('my-special-type', (val) => {
   return insert.addQuotes('*my-special-type* '+ val)
});


//set the next id strategy (optional)
insert.setNextIdStrategy((tableName, previousId) => {
    if(tableName == 't_address') {
        return previousId +10;
    }
    return --previousId;
});

//uncomment this line and see what happens:
//insert.setQueryBuilder(MyOwnQueryBuilder);



module.exports=insert;