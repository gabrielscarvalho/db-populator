import Database from './src/database';
import QueryBuilder from './src/query-builder';
import Id from './src/database/value/value-generator/id';
import Code from './src/database/value/value-generator/code';
import Random from './src/database/value/value-generator/random';
import DataRow from './src/data/DataRow';


const id = new Id();
const code = new Code();

const db: Database = new Database();


const customer = db.newTable('t_customer')
    .addColumn('id', 'int', id.getNext('t_customer'), 'id')
    .addColumn('name', 'string', Random.name(), 'name')
    .addColumn('surname', 'string', Random.lastName())
    .addColumn('email', 'string', Random.email())
    .addColumn('birthDate', 'date', Random.date({ minYear: 1970, maxYear: 2010 }))
    .addColumn('creation_date', 'datetime', Random.date({ minYear: 2018, maxYear: 2022 }))
    .addPrimaryKey('id');


const address = db.newTable('t_address')
    .addColumn('id', 'int', id.getNext('t_address'))
    .addColumn('customer_id', 'int', customer.getColumn('id'))
    .addColumn('street', 'string', Random.fromList(['St. Abc', 'St. Cde']))
    .addColumn('number', 'int', Random.number({ min: 1, max: 150 }))
    .addColumn('country', 'string', Random.fromList(['Brazil', 'United States']))
    .addColumn('creation_date', 'datetime', Random.date({ minYear: 2018, maxYear: 2022 }))
    .addColumn('is_main_address', 'bool', Random.fromList([true, false]))
    .addPrimaryKey('id');

const order = db.newTable('t_order')
    .addColumn('id', 'int', id.getNext('t_order'))
    .addColumn('orderCode', 'string', code.getNext('orderCode-'))
    .addColumn('customer_id', 'int', customer.getColumn('id'))
    .addColumn('delivery_ad', 'int', address.getColumn('id'), 'delivery_address_id')
    .addColumn('invoice_ad', 'int', address.getColumn('id'), 'invoice_address_id')
    .addColumn('total_price', 'float', Random.number({ min: 200, max: 500, decimals: 2 }))
    .addColumn('creation_date', 'datetime', Random.date({ minYear: 2018, maxYear: 2022 }))
    .addColumn('status', 'string', 'PROCESSING')
    .addPrimaryKey('orderCode');

const orderItem = db.newTable('t_order_item')
    .addColumn('id', 'int', id.getNext('t_order_item'))
    .addColumn('order_id', 'int', order.getColumn('id'))
    .addColumn('order_code', 'string', order.getColumn('orderCode'))
    .addColumn('product_name', 'string', Random.fromList(['Iphone 11', 'Samsung VT 42', 'Notebook LG']))
    .addColumn('total_price', 'float', Random.number({ min: 200, max: 500, decimals: 2 }))
    .addColumn('discount_price', 'float', Random.number({ min: 10, max: 50, decimals: 2 }))
    .addColumn('qty', 'int', Random.number({ min: 1, max: 3 }))
    .addColumn('called_fn_date', 'raw', 'NOw()')
    .addColumn('created_at', 'datetime', Random.dateWithSpecific({ year: 1998, day: 15, month: 3, hour: 20, minute: 42, seconds: 23 }))
    .addPrimaryKey('id');




const queryBuilder: QueryBuilder = new QueryBuilder(db);


queryBuilder.insert('t_customer')
const address1: DataRow = queryBuilder.insert('t_address', { street: 'delivery address' });
const address2: DataRow = queryBuilder.insert('t_address', { street: 'invoice address' });
queryBuilder.insert('t_order', { orderCode: 'ESSE AQUI MESMO', delivery_ad: address1.getData('id'), invoice_ad: address2.getData('id') });
queryBuilder.insert('t_order_item', {})
queryBuilder.insert('t_order_item', {})

queryBuilder.insert('t_order', { delivery_ad: address1.getData('id'), invoice_ad: address2.getData('id') });
queryBuilder.insert('t_order_item', {})
queryBuilder.insert('t_order_item', {})
queryBuilder.insert('t_order_item', {})


queryBuilder.print();


queryBuilder.purge();
//result.data.id = 3;

