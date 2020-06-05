import Database from './src/database';
import Table from './src/database/table';
import QueryBuilder from './src/query-builder';
import Id from './src/database/value/value-generator/id';
import Random from './src/database/value/value-generator/random';
import DataRow from './src/query/DataRow';


const id = new Id();

const db: Database = new Database();


const order: Table = new Table('t_order');
order.addColumn('id', 'int', id.getNext('t_order.id'));
order.addColumn('price', 'float', Random.number());


const consign: Table = new Table('t_consignment');

consign.addColumn('id', 'int', id.getNext('t_consignment.id'))
    .addColumnReference('orderId', order.getColumn('id'))
    .addColumn('price',  'float', Random.number());
    

db
    .addTable(order)
    .addTable(consign);


const queryBuilder : QueryBuilder = new QueryBuilder(db);

const result: DataRow = queryBuilder.insert('t_order', {});

//result.data.id = 3;

