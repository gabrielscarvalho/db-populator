const configure = require('./lib/insert');
const ID = require('./lib/id');

const PostgreSQL = require('./db/postgresql');



const initialIds = {
    't_order': 100,
    't_consignment': 100,
};

const id = new ID(initialIds);



const dbStructure = {
    't_order': {
        'id': { 'type': 'int', val: id.getNext('t_order'), column: 'order_id_comprido' },
        'order_code': { type: 'string' , val: 'FILL_ORDER_CODE'}
    },
    't_consignment': {
        'id': { 'type': 'int', val: id.getNext('t_consignment')},
        'order_id': { 'type': 'int', val: id.getCurrent('t_order')},
        'order_code': { 'type': 'string', val: 'FILL_ORDER_CODE'},
    }
};



const insert = configure(new PostgreSQL(dbStructure));

const order1 = insert('t_order', {'order_code' : 'NEW_ORDER_CODE'})
insert('t_consignment', { 'order_code' : order1.order_code})
insert('t_consignment', 'blablabal')
const order2 = insert('t_order', {'order_code' : 'NEW_ORDER_CODE_2'})
insert('t_consignment', { 'order_code' : order2.order_code})