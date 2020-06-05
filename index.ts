import Database from './src/database';
import Table from './src/database/table';
import QueryBuilder from './src/query-builder';
import Id from './src/database/value/value-generator/id';
import Random from './src/database/value/value-generator/random';
import DataRow from './src/data/DataRow';

const id = new Id();

const db: Database = new Database();



const order: Table = db.newTable('t_order');

order.addColumn('id', 'int', id.getNext('t_order.id'));
order.addColumn('price', 'int', Random.number());


const consign: Table = db.newTable('t_consignment');

consign.addColumn('id', 'int', id.getNext('t_consignment.id'), 'consignment_id')
    .addColumnReference('orderId', 'int', order.getColumn('id'),'order_id')
    .addColumn('price', 'int', Random.number(),'order_total_price');



const queryBuilder: QueryBuilder = new QueryBuilder(db);

const result: DataRow = queryBuilder.insert('t_order', {});
queryBuilder.insert('t_consignment', {});

queryBuilder.insert('t_order', {});
queryBuilder.insert('t_order', {});
queryBuilder.insert('t_consignment', {});

queryBuilder.insert('t_order', {});
queryBuilder.insert('t_consignment', {});
queryBuilder.insert('t_consignment', {});


queryBuilder.print();

//result.data.id = 3;

