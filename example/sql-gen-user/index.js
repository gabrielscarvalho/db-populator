
const insert = require('./configure-insert');



//First customer with 2 address
// and 2 orders

//you can access all the attributes of the customer.
// the object you receive here, is simple: column: value.
const customer = insert.add('t_customer', { 'email': 'john120@gmail.com' })

//address has customer_id on it. you can add it typing:
const address1 = insert.add('t_address', { 'street': 'delivery address', 'customer_id' : customer.id });

//or you can get the default value, that in db-structure.js, is configured as:
//   customer.id: { 'type': 'int', val: id.getNext('t_customer') },
//   address.customer_id: { 'type': 'int', val: id.getCurrent('t_customer') },
// at this mode, it will get the last inserted customer id:
const address2 = insert.add('t_address', { 'street': 'invoice address' });

insert.add('t_order', { 'delivery_ad': address1.id, 'invoice_ad': address2.id });
insert.add('t_order_item', {})

insert.add('t_order', { 'delivery_ad': address1.id, 'invoice_ad': address2.id });
insert.add('t_order_item', {})


// Second customer with 1 address
// 2 orders with 4 items
insert.add('t_customer', { 'email': 'mary123@gmail.com' })
insert.add('t_address', { 'street': 'delivery address' });
insert.add('t_order', {});
insert.add('t_order_item', {});
insert.add('t_order_item', {});
insert.add('t_order', {});
insert.add('t_order_item', {});
insert.add('t_order_item', {});
insert.add('t_order_item', {});



insert.printSQLs();

//console.log(insert.objects);
