import Database from './src/database';
import Table from './src/database/table';
import QueryBuilder from './src/query-builder';
import Id from './src/database/value/value-generator/id';
import Random from './src/database/value/value-generator/random';
import DataRow from './src/data/DataRow';

const id = new Id();

const db: Database = new Database();




const customer: Table = db.newTable('t_customer')
    .addColumn('id', 'int', id.getNext('t_customer.id'), 'customer_id')
    .addColumn('name', 'string', Random.name())
    .addColumn('email', 'string', Random.number());

const address: Table = db.newTable('t_address')
    .addColumn('id', 'int', id.getNext('t_address.id'), 'address_id')
    .addColumnReference('customerId', 'int', customer.getColumn('id'), 'customer_id')
    .addColumn('street', 'string', Random.name());


const order: Table = db.newTable('t_order')
    .addColumn('id', 'int', id.getNext('t_order.id'), 'order_id')
    .addColumnReference('customerId', 'int', customer.getColumn('id'), 'customer_id')
    .addColumnReference('deliveryId', 'int', address.getColumn('id'), 'delivery_id')
    .addColumn('price', 'int', Random.number());


const consign: Table = db.newTable('t_consignment');

consign.addColumn('id', 'int', id.getNext('t_consignment.id'), 'consignment_id')
    .addColumnReference('orderId', 'int', order.getColumn('id'),'order_id')
    .addColumn('price', 'int', Random.number(),'order_total_price');



const queryBuilder: QueryBuilder = new QueryBuilder(db);


queryBuilder.insert('t_customer', { name: 'Joao', id: 10});
queryBuilder.insert('t_address', {});
queryBuilder.insert('t_address', { customerId: (previous) => (previous.val + 10) });
queryBuilder.insert('t_order', {});
queryBuilder.insert('t_consignment', {});


queryBuilder.insert('t_customer');
queryBuilder.insert('t_customer');
queryBuilder.insert('t_customer');

queryBuilder.insert('t_order', {});
queryBuilder.insert('t_order', {});
queryBuilder.insert('t_consignment', {});

queryBuilder.insert('t_order', {});
queryBuilder.insert('t_consignment', {});
queryBuilder.insert('t_consignment', {});


queryBuilder.print();

//result.data.id = 3;

