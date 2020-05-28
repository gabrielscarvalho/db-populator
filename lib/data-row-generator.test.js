const DataRowGenerator = require('./data-row-generator');



describe('ValueStrategyParser', () => {


    const table = {

            'id': { type: 'int', val: 1, column: 'customer_id' },
            'name': { type: 'string', val: 'John' },
            'surname':  { type: 'string', val: () => ('Gates') },
            'other' : {type: 'string', val: 'will change'}
    }


    const dataGen = new DataRowGenerator(table)




    it('should generate without any param', () => {

        const result = dataGen.generateData({other: 'changed'});
        expect(result).toBeDefined();
        expect(result.completeResult).toBeDefined();
        expect(result.completeResult.customer_id).toBeDefined();
        expect(result.completeResult.name).toBeDefined();
        expect(result.completeResult.surname).toBeDefined();
        expect(result.completeResult.other).toBeDefined();


        expect(result.completeResult.customer_id.column).toBe('customer_id');
        expect(result.completeResult.customer_id.type).toBe('int');
        expect(result.completeResult.customer_id.val).toBe(1);


        expect(result.completeResult.name.column).toBe('name');
        expect(result.completeResult.name.type).toBe('string');
        expect(result.completeResult.name.val).toBe('John');

        expect(result.completeResult.surname.column).toBe('surname');
        expect(result.completeResult.surname.type).toBe('string');
        expect(result.completeResult.surname.val).toBe('Gates');


        expect(result.completeResult.other.column).toBe('other');
        expect(result.completeResult.other.type).toBe('string');
        expect(result.completeResult.other.val).toBe('changed');


        expect(result.simpleResult).toBeDefined();
        expect(result.simpleResult.id).toBe(1);
        expect(result.simpleResult.name).toBe('John');
        expect(result.simpleResult.surname).toBe('Gates');
        expect(result.simpleResult.other).toBe('changed');
    });
});