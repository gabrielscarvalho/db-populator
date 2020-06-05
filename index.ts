import Database from './src/database';
import Table from './src/database/table';
import ParseInteger from './src/database/value/parser/parser-integer';

const db: Database = new Database();


const order: Table = new Table('t_order');

db.addParser('int', new ParseInteger());


db.addTable(order);



