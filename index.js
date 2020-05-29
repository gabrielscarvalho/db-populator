
const insert = require('./configure-insert');


insert.add('t_customer')
const address1 = insert.add('t_address', { 'street': 'delivery address' });
const address2 = insert.add('t_address', { 'street': 'invoice address' });
insert.add('t_order', { 'delivery_ad': address1.id, 'invoice_ad': address2.id });
insert.add('t_order_item', {})
insert.add('t_order_item', {})

insert.add('t_order', { 'delivery_ad': address1.id, 'invoice_ad': address2.id });
insert.add('t_order_item', {})
insert.add('t_order_item', {})
insert.add('t_order_item', {})

//insert.printData();
insert.printSQLs();

//all data created
//console.log(insert.objects));

//more detailed data:
//console.log(insert.completeObjects));