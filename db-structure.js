const Random = require('./lib/random');

const dataGenerator = (id) => ({

    't_customer': {
        'id': { 'type': 'int', val: id.getNext('t_customer') },
        'name': { type: 'string', val: Random.fromList(['John', 'Paul', 'Suzan', 'Mark']) },
        'surname': { type: 'string', val: Random.fromList(['Doe', 'Mcknight', 'Gates', 'Jobs']) },
        'email': { type: 'string', val: Random.fromList(['John', 'Paul', 'Suzan', 'Mark'],'@', ['gmail', 'hotmail'], ['.com.br', '.com'], '123') },
        'birthDate': { type: 'date', val: Random.date({ minYear: 1970, maxYear: 2010 }) },
        'creation_date': { type: 'datetime', val: Random.date({ addTime: true, minYear: 2018, maxYear: 2022 }) }
    },
    't_address': {
        'id': { 'type': 'int', val: id.getNext('t_address') },
        'customer_id': { 'type': 'int', val: id.getCurrent('t_customer') },
        'street': { type: 'string', val: Random.fromList(['St. Abc', 'St. Cde']) },
        'number': { type: 'int', val: Random.number({ min: 1, max: 150 }) },
        'country': { type: 'string', val: Random.fromList(['Brazil', 'United States']) },
        'creation_date': { type: 'datetime', val: Random.date({ addTime: true, minYear: 2018, maxYear: 2022 }) },
        'is_main_address': { type: 'bool', val: Random.fromList([true, false]) }
    },
    't_order': {
        'id': { 'type': 'int', val: id.getNext('t_order') },
        'order_code': {'type': 'string', val: id.getNextRandomCode('orderCode', 'order-code', 6)},
        'customer_id': { 'type': 'int', val: id.getCurrent('t_customer') },
        'delivery_ad': { 'type': 'int', val: id.getCurrent('t_address'), column: 'delivery_address_id' },
        'invoice_ad': { 'type': 'int', val: id.getCurrent('t_address'), column: 'invoice_address_id' },
        'total_price': { 'type': 'float', val: Random.number({ min: 200, max: 500, decimals: 2 }) },
        'creation_date': { type: 'datetime', val: Random.date({ addTime: true, minYear: 2018, maxYear: 2022 }) },
        'status': { type: 'string', val: 'PROCESSING' }
    },
    't_order_item': {
        'id': { 'type': 'int', val: id.getNext('t_order_item') },
        'order_id': { 'type': 'int', val: id.getCurrent('t_order') },
        'order_code': { 'type': 'string', val: id.getCurrentCode('orderCode') },
        'product_name': { type: 'string', val: Random.fromList(['Iphone 11', 'Samsung VT 42', 'Notebook LG']) },
        'total_price': { 'type': 'float', val: Random.number({ min: 200, max: 500, decimals: 2 }) },
        'discount_price': { 'type': 'float', val: Random.number({ min: 10, max: 50, decimals: 2 }) },
        'qty': { 'type': 'int', val: Random.number({ min: 1, max: 3 }) },
        'called_fn_date' : {'type' : 'raw', val: 'NOw()'},
        'created_at': {type: 'datetime', val: Random.dateWithSpecific({year: 1998, day: 15, month: 3, hour: 20, minute: 42, seconds: 23})}  
    }
});

module.exports = dataGenerator;