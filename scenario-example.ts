import { QueryBuilder } from './query';
import { Id, Code, Random, DateIncrement, date } from './data';
import { ParserFloat, parserConfig, ParserBuilder, Parser } from './parser';
import { Database, DataRow } from './db';
import { ParserDate } from './src/database/value/parser/parser-date';
//import {enableLogger } from './src/commons/logger';
//enableLogger(true);

const id = new Id({
    t_customer: 10,
    t_order_item: 40
});
const code = new Code();

parserConfig.QUOTE_CHAR = "'";



const db: Database = new Database();



const TimestampParser: Parser = ParserBuilder('timestamp', (val, utils) => {

    console.log('my date is: ', val);
    const parserDate: ParserDate = ParserDate.withFormat('YYYY-MM-DD HH:mm:ss');

    return `TO_TIMESTAMP('${parserDate.parse(val, false)}', 'yyyy-mm-dd hh24:mi:ss')`;
});
const MoneyParser = ParserFloat.withPrecision('money', 2);



db.addParser(TimestampParser);
db.addParser(MoneyParser);



const customer = db.newTable('t_customer')
    .addColumn('id', 'int', id.getNext('t_customer'), 'customer_id')
    .addColumn('name', 'string', Random.name(), 'customer_name')
    .addColumn('surname', 'string', Random.lastName(), 'customer_surname')
    .addColumn('email', 'string', Random.email(), 'customer_email')
    .addColumn('birthDate', 'date', Random.date({ minYear: 1970, maxYear: 2010 }))
    .addColumn('creation_date', 'timestamp',DateIncrement(date('2010-03-05'), 5)) // Random.date({ minYear: 2018, maxYear: 2022 }))
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
    .addColumn('orderCode', 'string', code.getNext('orderCode-'), 'order_code')
    .addColumn('customer_id', 'int', customer.getColumn('id'))
    .addColumn('delivery_ad', 'int', address.getColumn('id'), 'delivery_address_id')
    .addColumn('invoice_ad', 'int', address.getColumn('id'), 'invoice_address_id')
    .addColumn('total_price', 'float', Random.number({ min: 200, max: 500, decimals: 2 }))
    .addColumn('creation_date', 'datetime', Random.date({ minYear: 2018, maxYear: 2022 }))
    .addPrimaryKey('orderCode');

const orderItem = db.newTable('t_order_item')
    .addColumn('id', 'int', id.getNext('t_order_item'))
    .addColumn('freshierDate', 'timestamp', DateIncrement(date('2010-03-05'), 5))
    .addColumn('order_id', 'int', order.getColumn('id'))
    .addColumn('order_code', 'string', order.getColumn('orderCode'))
    .addColumn('product_name', 'string', Random.fromList(['Iphone 11', 'Samsung VT 42', 'Notebook LG']))
    .addColumn('created_at', 'datetime', Random.dateWithSpecific({ year: 1998, day: 15, month: 3, hour: 20, minute: 42, seconds: 23 }))
    .addColumn('qty', 'int', Random.number({ min: 1, max: 3 }))
    .addColumn('unit_price', 'float', Random.number({ min: 30, max: 50, decimals: 5 }))
    .addColumn('discount_price', MoneyParser, Random.number({ min: 10, max: 15, decimals: 2 }))
    .addColumn('total_price', 'money', Random.number({ min: 200, max: 500, decimals: 2 }))
    .addPrimaryKey('id');

orderItem.afterGenerateData(data => {
    const qty: number = data.get('qty');
    const unitPrice: number = data.get('unit_price');
    const discountPrice: number = data.get('discount_price');

    let totalPrice = ((qty * unitPrice) - discountPrice);
    data.set('total_price', totalPrice);
});


const queryBuilder: QueryBuilder = new QueryBuilder(db);


queryBuilder.insert('t_customer')

const address1: DataRow = queryBuilder.insert('t_address', { street: 'delivery address' });
const address2: DataRow = queryBuilder.insert('t_address', { street: 'invoice address' });
queryBuilder.insert('t_order', { delivery_ad: address1.get('id'), invoice_ad: address2.get('id') });
queryBuilder.insert('t_order_item', {})
queryBuilder.insert('t_order_item', {})

queryBuilder.insert('t_order', { delivery_ad: address1.get('id'), invoice_ad: address2.get('id') });
queryBuilder.insert('t_order_item', {})
let item2: DataRow = queryBuilder.insert('t_order_item', {})
queryBuilder.insert('t_order_item')


queryBuilder.print();


queryBuilder.purge();
//result.data.id = 3;

