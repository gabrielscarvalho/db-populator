
const insert = require('./insert');


insert('t_customer', { 'email': 'john120@gmail.com' })
const address1 = insert('t_address', { 'street': 'delivery address' });
const address2 = insert('t_address', { 'street': 'invoice address' });
insert('t_order', { 'delivery_ad': address1.id, 'invoice_ad': address2.id });
insert('t_order_item', {})
insert('t_order_item', {})

insert('t_order', { 'delivery_ad': address1.id, 'invoice_ad': address2.id });
insert('t_order_item', {})
insert('t_order_item', {})
insert('t_order_item', {})

//insert.printData();
insert.printSQLs();