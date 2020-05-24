
let data = {

    't_order' : {   
        'id' : field({ type: 'int', val: getNextId('t_order') }),
        'code': field({ type: 'string', val: 'order_code', column : 'order_code'}),
        'name': field({ type: 'string', val: random('name') }),
        'created_at' : field({ type: 'datetime', val: randomDate({start: '01-01-2020', end: '20-02-2020'}) }),
        'flag': field({ type: 'bool', val: randomBool() }),
        'customer_email': field({ type: 'string', val: random('email') })
    },
    't_consignment': {   
        'id' : field({ type: 'int', val: getNextId('t_consignment') }),
        'order_id': field({ type: 'int', val: getCurrentId('t_order') }),
        'total_value' : field({ type: 'float', val: getRandomNumber({min:0, max:200, decimals:2})}),
        'freight_value': field({ type: 'float', val: getRandomNumber({min:5, max:50, decimals:2})})
    },
    't_item': {   
        'id' : field({ type: 'int', val: getNextId('t_item') }),
        'order_code': field({ type: 'int', val: 'order_code' }),
        'total_value' : field({ type: 'float', val: getRandomNumber({min:0, max:200, decimals:2})}),
        'freight_value': field({ type: 'float', val: getRandomNumber({min:5, max:50, decimals:2})})
    }
};


setIds({
    't_order' : 10000, 
    't_consignment' : 10000
})

const getNextId = (table, previousId) => {
    return --previousId;
}

const treatTypes = (type, value, defaultTreatment) => {

}


PostgreSQL(data, getNextId, treatTypes);


const order = insert('t_order', { name: 'John', surname: 'Max'});
const consig = insert('t_consignment', { name: 'John', surname: 'Max'});
insert('t_item', { 'order_code' : order.code});
insert('t_item', { 'order_code' : order.code});
insert('t_item', { 'order_code' : order.code});


insert('t_consignment', { name: 'John', surname: 'Max'});



printAll();