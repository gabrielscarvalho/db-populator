const Insertable = require('./insertable');
const Random = require('./random');


describe('Test Insertable - Simplest scenario', () => {

    const dbStructure = (id) => ({
        't_customer': {
            'id': { type: 'int', val: id.getNext('t_customer'), column: 'customer_id' },
            'name': { type: 'string', val: 'John' },
        },
        't_address': {
            'id': { type: 'int', val: id.getNext('t_address') },
            'customer_id': { type: 'int', val: id.getCurrent('t_customer') }
        }
    });


    const insert = new Insertable(dbStructure, {});


    it('Simplest scenario', () => {
        
        insert.add('t_customer');
        expect(insert.getLastSQL()).toBe("INSERT INTO t_customer(customer_id,name) VALUES (1,'John');")

        insert.add('t_address');
        expect(insert.getLastSQL()).toBe('INSERT INTO t_address(id,customer_id) VALUES (1,1);')

        insert.add('t_address');
        expect(insert.getLastSQL()).toBe('INSERT INTO t_address(id,customer_id) VALUES (2,1);')

        insert.add('t_address', {'ignoredAttribute': 'ignored'});
        expect(insert.getLastSQL()).toBe('INSERT INTO t_address(id,customer_id) VALUES (3,1);')

        insert.add('t_customer', {name: 'Paul'});
        expect(insert.getLastSQL()).toBe("INSERT INTO t_customer(customer_id,name) VALUES (2,'Paul');")

        insert.add('t_address');
        expect(insert.getLastSQL()).toBe('INSERT INTO t_address(id,customer_id) VALUES (4,2);')
   
        expect(insert.objects.length).toBe(6);
    });

    it('When change the strategy to get next id, must work', () => {
        insert.setNextIdStrategy((tableName, previousId) =>  {
            return previousId+10;
        });

        insert.add('t_customer', {name: 'Jake'});
        expect(insert.getLastSQL()).toBe("INSERT INTO t_customer(customer_id,name) VALUES (12,'Jake');")

        insert.add('t_address');
        expect(insert.getLastSQL()).toBe('INSERT INTO t_address(id,customer_id) VALUES (14,12);')

        insert.add('t_address');
        expect(insert.getLastSQL()).toBe('INSERT INTO t_address(id,customer_id) VALUES (24,12);')

    });
});


