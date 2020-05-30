const ValueStrategyParser = require('./value-strategy-parser');


describe('ValueStrategyParser', () => {

    const valueStrategy = new ValueStrategyParser("'")


    it('Converting to string must do it properly', () => {
        const type = 'string';
        expect(valueStrategy.apply(type, 'an-string-value')).toBe("'an-string-value'");
        expect(valueStrategy.apply(type, 1)).toBe("'1'");
        expect(valueStrategy.apply(type, null)).toBe("null");
        expect(valueStrategy.apply(type, undefined)).toBe('null');
        expect(valueStrategy.apply(type, 2.3)).toBe("'2.3'");

        expect(() => {
            valueStrategy.apply(type, [])
        }).toThrow(Error);


        expect(() => {
            valueStrategy.apply(type, {})
        }).toThrow(Error);


        expect(() => {
            valueStrategy.apply(type, () => { })
        }).toThrow(Error);
    });

    it('Converting to int must do it properly', () => {
        const type = 'int';
        expect(valueStrategy.apply(type, '2.432')).toBe(2);
        expect(valueStrategy.apply(type, 1)).toBe(1);
        expect(valueStrategy.apply(type, null)).toBe('null');
        expect(valueStrategy.apply(type, undefined)).toBe('null');
        expect(valueStrategy.apply(type, 2.3)).toBe(2);

        expect(() => {
            valueStrategy.apply(type, 'jdvd')
        }).toThrow(Error);

        expect(() => {
            valueStrategy.apply(type, [])
        }).toThrow(Error);


        expect(() => {
            valueStrategy.apply(type, {})
        }).toThrow(Error);


        expect(() => {
            valueStrategy.apply(type, () => { })
        }).toThrow(Error);
    });


    it('Converting to float must do it properly', () => {
        const type = 'float';
        expect(valueStrategy.apply(type, '2.432')).toBe(2.432);
        expect(valueStrategy.apply(type, 1)).toBe(1);
        expect(valueStrategy.apply(type, null)).toBe('null');
        expect(valueStrategy.apply(type, undefined)).toBe('null');
        expect(valueStrategy.apply(type, 2.3)).toBe(2.3);

        expect(() => {
            valueStrategy.apply(type, 'jdvd')
        }).toThrow(Error);

        expect(() => {
            valueStrategy.apply(type, [])
        }).toThrow(Error);


        expect(() => {
            valueStrategy.apply(type, {})
        }).toThrow(Error);


        expect(() => {
            valueStrategy.apply(type, () => { })
        }).toThrow(Error);
    });


    it('Converting to bool must do it properly', () => {
        const type = 'bool';
        expect(valueStrategy.apply(type, null)).toBe('null');
        expect(valueStrategy.apply(type, undefined)).toBe('null');
        expect(valueStrategy.apply(type, true)).toBe('true');
        expect(valueStrategy.apply(type, 'true')).toBe('true');

        expect(() => {
            expect(valueStrategy.apply(type, 1))
        }).toThrow(Error);

        expect(() => {
            expect(valueStrategy.apply(type, 2.3))
        }).toThrow(Error);

        expect(() => {
            valueStrategy.apply(type, [])
        }).toThrow(Error);


        expect(() => {
            valueStrategy.apply(type, {})
        }).toThrow(Error);


        expect(() => {
            valueStrategy.apply(type, () => { })
        }).toThrow(Error);
    });


    it('Converting to raw must do it properly', () => {
        const type = 'raw';
        expect(valueStrategy.apply(type, null)).toBe('null');
        expect(valueStrategy.apply(type, undefined)).toBe('null');
        expect(valueStrategy.apply(type, true)).toBe('true');
        expect(valueStrategy.apply(type, 1)).toBe('1');
        expect(valueStrategy.apply(type, 1.32)).toBe('1.32');
        expect(valueStrategy.apply(type, 'NOW()')).toBe('NOW()');

        expect(() => {
            valueStrategy.apply(type, [])
        }).toThrow(Error);


        expect(() => {
            valueStrategy.apply(type, {})
        }).toThrow(Error);


        expect(() => {
            valueStrategy.apply(type, () => { })
        }).toThrow(Error);
    });


    it('Converting to date must do it properly', () => {
        const type = 'date';
        expect(valueStrategy.apply(type, 'received')).toBe("'received'"); //we trust user will know what to do when inform string.
        expect(valueStrategy.apply(type, null)).toBe('null');
        expect(valueStrategy.apply(type, undefined)).toBe('null');
        const d = new Date(2020, 10, 15, 12, 32, 55);
        expect(valueStrategy.apply(type, d)).toBe("'2020-11-15'");
        

        expect(() => {
            valueStrategy.apply(type, true)
        }).toThrow(Error);

        expect(() => {
            valueStrategy.apply(type, 2.3)
        }).toThrow(Error);

        expect(() => {
            valueStrategy.apply(type, 2)
        }).toThrow(Error);

        expect(() => {
            valueStrategy.apply(type, [])
        }).toThrow(Error);


        expect(() => {
            valueStrategy.apply(type, {})
        }).toThrow(Error);


        expect(() => {
            valueStrategy.apply(type, () => { })
        }).toThrow(Error);
    });



    it('Converting to datetime must do it properly', () => {
        const type = 'datetime';
        expect(valueStrategy.apply(type, 'received')).toBe("'received'"); //we trust user will know what to do when inform string.
        expect(valueStrategy.apply(type, null)).toBe('null');
        expect(valueStrategy.apply(type, undefined)).toBe('null');
        const d = new Date(2020, 10, 15, 12, 32, 55);
        expect(valueStrategy.apply(type, d)).toBe("'2020-11-15 12:32:55'");
        

        expect(() => {
            valueStrategy.apply(type, true)
        }).toThrow(Error);

        expect(() => {
            valueStrategy.apply(type, 2.3)
        }).toThrow(Error);

        expect(() => {
            valueStrategy.apply(type, 2)
        }).toThrow(Error);

        expect(() => {
            valueStrategy.apply(type, [])
        }).toThrow(Error);


        expect(() => {
            valueStrategy.apply(type, {})
        }).toThrow(Error);


        expect(() => {
            valueStrategy.apply(type, () => { })
        }).toThrow(Error);
    });

    it('Calling unknown parse must throw exception', () => {       
        expect(() => {
            valueStrategy.apply('unknown', 'any value')
        }).toThrow(Error);
    });


    it('Calling a new parse must throw exception', () => {       
        expect(() => {
            valueStrategy.apply('unknown', 'any value')
        }).toThrow(Error);

        valueStrategy.addParser('unknown', () => ('123'));

        expect(valueStrategy.apply('unknown', 'any value')).toBe('123')
    });

    it('Setting a null string must do it properly', () => {       
        expect(valueStrategy.apply('string', null)).toBe('null');
        const valueStrategy2 = new ValueStrategyParser('"');
        valueStrategy2.setNullString('OTHER_VALUE');
        expect(valueStrategy2.apply('string', null)).toBe('OTHER_VALUE');
    });


    it('Adding quotes must do it properly', () => {       
        expect(valueStrategy.addQuotes('string')).toBe("'string'");
        const valueStrategy2 = new ValueStrategyParser('"');
        expect(valueStrategy2.addQuotes('string')).toBe('"string"');
    });


    it('Adding nullstring must do it properly', () => {       
        expect(valueStrategy.apply('string', null)).toBe('null');
        const valueStrategy2 = new ValueStrategyParser('"', 'OTHER_VALUE');
        expect(valueStrategy2.apply('string', null)).toBe('OTHER_VALUE');
    });


    it('Creating invalid parser must throw exception', () => {       
        expect(() => {
            valueStrategy.addParser(null, () => ('A'));
        }).toThrow(Error);
    
        expect(() => {
            valueStrategy.addParser(undefined, () => ('A'));
        }).toThrow(Error);

        
        expect(() => {
            valueStrategy.addParser(1, () => ('A'));
        }).toThrow(Error);
    
    
        expect(() => {
            valueStrategy.addParser({}, () => ('A'));
        }).toThrow(Error);
    
        expect(() => {
            valueStrategy.addParser([], () => ('A'));
        }).toThrow(Error);
    
    
        expect(() => {
            valueStrategy.addParser(() => {}, () => ('A'));
        }).toThrow(Error);



        expect(() => {
            valueStrategy.addParser('type', null);
        }).toThrow(Error);

        expect(() => {
            valueStrategy.addParser('type', undefined);
        }).toThrow(Error);

        expect(() => {
            valueStrategy.addParser('type', 'A');
        }).toThrow(Error);
    
        expect(() => {
            valueStrategy.addParser('type', 2);
        }).toThrow(Error);
    
    
        expect(() => {
            valueStrategy.addParser('type', {});
        }).toThrow(Error);
    
        expect(() => {
            valueStrategy.addParser('type', []);
        }).toThrow(Error);
    
    });

});