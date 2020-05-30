const Insertable = require('./insertable');


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

        insert.add('t_address', { 'ignoredAttribute': 'ignored' });
        expect(insert.getLastSQL()).toBe('INSERT INTO t_address(id,customer_id) VALUES (3,1);')

        insert.add('t_customer', { name: 'Paul' });
        expect(insert.getLastSQL()).toBe("INSERT INTO t_customer(customer_id,name) VALUES (2,'Paul');")

        insert.add('t_address');
        expect(insert.getLastSQL()).toBe('INSERT INTO t_address(id,customer_id) VALUES (4,2);')

        expect(insert.objects.length).toBe(6);
    });

    it('When change the strategy to get next id, must work', () => {
        insert.setNextIdStrategy((tableName, previousId) => {
            return previousId + 10;
        });

        insert.add('t_customer', { name: 'Jake' });
        expect(insert.getLastSQL()).toBe("INSERT INTO t_customer(customer_id,name) VALUES (12,'Jake');")

        insert.add('t_address');
        expect(insert.getLastSQL()).toBe('INSERT INTO t_address(id,customer_id) VALUES (14,12);')

        insert.add('t_address');
        expect(insert.getLastSQL()).toBe('INSERT INTO t_address(id,customer_id) VALUES (24,12);')

    });
});


describe('Test Insertable - All field types', () => {

    const date = new Date(2010, 10, 15, 18, 45, 49);

    const dbStructure = () => ({
        't_customer': {
            'id': { type: 'int', val: 1.5, column: 'customer_id' },
            'name': { type: 'string', val: 'John' },
            'birthDate': { type: 'date', val: date, column: 'birth_date' },
            'money': { type: 'float', val: '32.549', },
            'creationDate': { type: 'datetime', val: date, column: 'creation_date' },
            'timestamp': { type: 'raw', val: 'NOW()', column: 'with_function' },
            'boolCol': { type: 'bool', val: true }
        }
    });


    const insert = new Insertable(dbStructure, {});

    it('Simplest scenario', () => {
        insert.add('t_customer');
        expect(insert.getLastSQL()).toBe("INSERT INTO t_customer(customer_id,name,birth_date,money,creation_date,with_function,boolCol) VALUES (1,'John','2010-11-15',32.549,'2010-11-15 18:45:49',NOW(),true);")
    });
});

describe('Test Insertable - All null value', () => {

    const dbStructure = () => ({
        't_customer': {
            'id': { type: 'int', val: null, column: 'customer_id' },
            'name': { type: 'string', val: null },
            'birthDate': { type: 'date', val: null, column: 'birth_date' },
            'money': { type: 'float', val: null, },
            'creationDate': { type: 'datetime', val: null, column: 'creation_date' },
            'timestamp': { type: 'raw', val: null, column: 'with_function' },
            'boolCol': { type: 'bool', val: null }
        }
    });


    const insert = new Insertable(dbStructure, {});

    it('Simplest scenario', () => {
        insert.add('t_customer');
        expect(insert.getLastSQL()).toBe("INSERT INTO t_customer(customer_id,name,birth_date,money,creation_date,with_function,boolCol) VALUES (null,null,null,null,null,null,null);");

        insert.setNullValue('none');

        insert.add('t_customer');
        expect(insert.getLastSQL()).toBe("INSERT INTO t_customer(customer_id,name,birth_date,money,creation_date,with_function,boolCol) VALUES (none,none,none,none,none,none,none);");

    });
});

describe('Test Insertable - Set initial id', () => {

    const dbStructure = (id) => ({
        't_customer': {
            'id': { type: 'int', val: id.getNext('t_customer'), column: 'customer_id' },
            'name': { type: 'string', val: 'John' },
        }
    });


    const insert = new Insertable(dbStructure, {
        't_customer': 10
    });


    it('When change initial id, it must reflect.', () => {

        insert.add('t_customer');
        expect(insert.getLastSQL()).toBe("INSERT INTO t_customer(customer_id,name) VALUES (11,'John');")

        insert.add('t_customer');
        expect(insert.getLastSQL()).toBe("INSERT INTO t_customer(customer_id,name) VALUES (12,'John');")

        insert.setInitialIds({
            't_customer': 100
        })

        insert.add('t_customer');
        expect(insert.getLastSQL()).toBe("INSERT INTO t_customer(customer_id,name) VALUES (101,'John');")

    });
});



describe('Test Insertable - Add new parser', () => {

    const dbStructure = () => ({
        't_customer': {
            'name': { type: 'my-format', val: 'John' },
        }
    });


    const insert = new Insertable(dbStructure,{});


    it('When change initial id, it must reflect.', () => {

        expect(() => {
            insert.add('t_customer');    
        }).toThrow(Error);

        insert.addParser('my-format', (val) => (insert.addQuotes('123'+val)));


        insert.add('t_customer');
        expect(insert.getLastSQL()).toBe("INSERT INTO t_customer(name) VALUES ('123John');")
    });
});


describe('Test Insertable - Comments', () => {

    const dbStructure = () => ({
        't_customer': {
            'name': { type: 'my-format', val: 'John' },
        }
    });


    const insert = new Insertable(dbStructure,{});


    it('When asked to do something manually, should do it', () => {

        insert.addCommentLine('a comment');
        expect(insert.getLastSQL()).toBe("--a comment");

        insert.addRawInsert('INSERT INTO TABLE');
        expect(insert.getLastSQL()).toBe("INSERT INTO TABLE");

    });
});