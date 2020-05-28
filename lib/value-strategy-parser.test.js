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

});