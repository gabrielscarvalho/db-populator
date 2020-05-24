const configure = require('./lib/insert');
const ID = require('./lib/id');
const ValueStrategyParser = require('./lib/value-strategy-parser');
const PostgreSQL = require('./db/postgresql');
const Random = require('./lib/random');



const initialIds = {
    't_order': 100,
    't_consignment': 100,
};

const id = new ID(initialIds);

const valueStrategyParser = new ValueStrategyParser("'");



const dbStructure = {
    't_order': {
        'id': { 'type': 'int', val: id.getNext('t_order'), column: 'order_id_comprido' },
        'order_code': { type: 'string' , val: 'FILL_ORDER_CODE'},
        'creation_date': { type: 'datetime' , val: Random.date({ addTime: true})},
        'birth_date': { type: 'date' , val: Random.date({minYear: 1970, maxYear: 2010})}, 
        'customer_name': { type: 'string', val: Random.fromList(['John', 'Paul', 'Suzan', 'Mark'])},
        'total_value': { type: 'float', val: Random.number({min: 100, max: 200, decimals: 2})},
        'age': { type: 'int', val: Random.number({min: 18, max: 50})},
    },
    't_consignment': {
        'id': { 'type': 'int', val: id.getNext('t_consignment')},
        'order_id': { 'type': 'int', val: id.getCurrent('t_order')},
        'order_code': { 'type': 'string', val: 'FILL_ORDER_CODE'},
    }
};



const insert = configure(new PostgreSQL(dbStructure, valueStrategyParser));

const order1 = insert('t_order', {'order_code' : 'NEW_ORDER_CODE'})
insert('t_consignment', { 'order_code' : order1.order_code})
insert('t_consignment', 'blablabal')
const order2 = insert('t_order', {'order_code' : 'NEW_ORDER_CODE_2'})
insert('t_consignment', { 'order_code' : order2.order_code});

insert('t_order', {'order_code' : 'NEW_ORDER_CODE3'})
insert('t_order', {'order_code' : 'NEW_ORDER_CODE4'})
insert('t_order', {'order_code' : 'NEW_ORDER_CODE5'})

insert.printAll();