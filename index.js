const configure = require('./lib/insert');
const ID = require('./lib/id');
const ValueStrategyParser = require('./lib/value-strategy-parser');
const PostgreSQL = require('./db/postgresql');

const dbStructure = require('./db-structure');

const initialIds = {
    't_customer': 0,
    't_address': 0,
    't_order': 0,
    't_order_item': 0
};
const id = new ID(initialIds, (table, previousId) => {
    return --previousId;
});

const valueStrategyParser = new ValueStrategyParser("'");

const insert = configure(new PostgreSQL(dbStructure(id), valueStrategyParser));


insert('t_customer', { 'email': 'john120@gmail.com' })
const address1 = insert('t_address', { 'street': 'delivery address' });
const address2 = insert('t_address', { 'street': 'invoice address' });
insert('t_order', { 'delivery_ad': address1.id, 'invoice_ad': address2.id });
insert('t_order_item',{})
insert('t_order_item',{})

insert('t_order', { 'delivery_ad': address1.id, 'invoice_ad': address2.id });
insert('t_order_item',{})
insert('t_order_item',{})
insert('t_order_item',{})

//insert.printData();
insert.printAll();