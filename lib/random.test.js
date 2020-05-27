const Random = require('./random');



describe('Random.fromList', ()=> {

  it('Simple random list must work properly with strings', () => {

    let data = ['A','B','C']
    const dataGen = Random.fromList(data);
    expect(typeof dataGen).toBe('function');
    expect(data.indexOf(dataGen()) > -1).toBe(true);
  });

  it('random list must work properly with two lists', () => {

    let data = ['A','B','C']
    let data2 = ['d','e','f'];
    const dataGen = Random.fromList(data, data2);
    expect(typeof dataGen).toBe('function');


    const result = dataGen();
    expect(result.length).toBe(2);

    expect(data.indexOf(result[0]) > -1).toBe(true);
    expect(data2.indexOf(result[1]) > -1).toBe(true);
  });

  it('random list must work properly with two lists and fixed string', () => {

    let data = ['A']
    let data2 = ['B'];
    const dataGen = Random.fromList(data,'fixed', data2);
    expect(typeof dataGen).toBe('function');


    const result = dataGen();
    expect(result).toBe('AfixedB');
  });

  it('random list must work properly with two lists and fixed int', () => {

    let data = ['A']
    let data2 = ['B'];
    const dataGen = Random.fromList(data, 2, data2);
    expect(typeof dataGen).toBe('function');


    const result = dataGen();
    expect(result).toBe('A2B');
  });

  it('random list must work properly with two lists and fixed int', () => {

    let data = [3]
    let data2 = [4];
    const dataGen = Random.fromList(data, 2, data2);
    expect(typeof dataGen).toBe('function');

    const result = dataGen();
    expect(result).toBe('324');
  });

});

describe('Random.string', () => {

    it('Should return random value', () => {
        const dataGen = Random.string('prefix', 4);
        expect(typeof dataGen).toBe('function');

        const result = dataGen();
        expect(result.indexOf('prefix') > -1).toBe(true);
        expect(result.length).toBe(10);

        let savedRandom = [result]
        //assure that when retry 10000 times, it wont repeat.
        for(let i=0; i<10000; i++){
            let newString = dataGen();
            expect(savedRandom[newString]).toBe(undefined);
            savedRandom.push(newString);
        }
    });
});



describe('Random.number', () => {

    it('Should return random value int', () => {
        const dataGen = Random.number({min: 1, max: 10});
        expect(typeof dataGen).toBe('function');

        const result = dataGen();
        expect(Number.isInteger(result)).toBe(true);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(10);
    });

    it('Should return random value float', () => {
        const dataGen = Random.number({min: 1, max: 10, decimals: 2});
        expect(typeof dataGen).toBe('function');

        const result = dataGen();
        expect(Number.isInteger(result)).toBe(false);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(10.99);
    });
});


describe('Random.date', () => {

    const assertBetween =(realValue, expectFrom, expectTo) => {
        expect(realValue).toBeGreaterThanOrEqual(expectFrom);
        expect(realValue).toBeLessThanOrEqual(expectTo);
    }

    it('Should return full random date', () => {
        const dateGen = Random.date({ minYear: 2010, maxYear: 2021, minMonth: 1, maxMonth: 3, minDay: 4, maxDay: 10});
        expect(typeof dateGen).toBe('function');

        expect(typeof dateGen()).toBe('object');
        
        const date = dateGen();
        assertBetween(date.getFullYear(), 2010, 2021);
        assertBetween(date.getMonth(), 0, 2); //month counts from 0.
        assertBetween(date.getDate(), 4, 10); //month counts from 0.

        expect(date.getHours()).not.toBe(undefined);
        expect(date.getMinutes()).not.toBe(undefined);
        expect(date.getSeconds()).not.toBe(undefined);
    });


    it('Should return specific year', () => {
        const dateGen = Random.dateWithSpecific({ year: 2010});
        expect(typeof dateGen).toBe('function');

        expect(typeof dateGen()).toBe('object');
        
        const date = dateGen();
        expect(date.getFullYear()).toBe(2010);
        assertBetween(date.getMonth(), 0, 11); //month counts from 0.
        assertBetween(date.getDate(), 1, 31); //month counts from 0.

        expect(date.getHours()).not.toBe(undefined);
        expect(date.getMinutes()).not.toBe(undefined);
        expect(date.getSeconds()).not.toBe(undefined);
    });


    it('Should return specific year and month', () => {
        const dateGen = Random.dateWithSpecific({ year: 2010, month: 4});
        expect(typeof dateGen).toBe('function');

        expect(typeof dateGen()).toBe('object');
        
        const date = dateGen();
        expect(date.getFullYear()).toBe(2010);
        expect(date.getMonth()).toBe(3);
        assertBetween(date.getDate(), 1, 31); //month counts from 0.

        expect(date.getHours()).not.toBe(undefined);
        expect(date.getMinutes()).not.toBe(undefined);
        expect(date.getSeconds()).not.toBe(undefined);
    });



    it('Should return specific year and month and day', () => {
        const dateGen = Random.dateWithSpecific({ year: 2010, month: 4, day: 10});
        expect(typeof dateGen).toBe('function');

        expect(typeof dateGen()).toBe('object');
        
        const date = dateGen();
        expect(date.getFullYear()).toBe(2010);
        expect(date.getMonth()).toBe(3);
        expect(date.getDate()).toBe(10);

        expect(date.getHours()).not.toBe(undefined);
        expect(date.getMinutes()).not.toBe(undefined);
        expect(date.getSeconds()).not.toBe(undefined);
    });


    it('Should return specific year and month and day and hour', () => {
        const dateGen = Random.dateWithSpecific({ year: 2010, month: 4, day: 10, hour: 13});
        expect(typeof dateGen).toBe('function');

        expect(typeof dateGen()).toBe('object');
        
        const date = dateGen();
        expect(date.getFullYear()).toBe(2010);
        expect(date.getMonth()).toBe(3);
        expect(date.getDate()).toBe(10);

        expect(date.getHours()).toBe(13);
        expect(date.getMinutes()).not.toBe(undefined);
        expect(date.getSeconds()).not.toBe(undefined);
    });

    it('Should return specific year and month and day and hour and minute', () => {
        const dateGen = Random.dateWithSpecific({ year: 2010, month: 4, day: 10, hour: 13, minute: 44});
        expect(typeof dateGen).toBe('function');

        expect(typeof dateGen()).toBe('object');
        
        const date = dateGen();
        expect(date.getFullYear()).toBe(2010);
        expect(date.getMonth()).toBe(3);
        expect(date.getDate()).toBe(10);

        expect(date.getHours()).toBe(13);
        expect(date.getMinutes()).toBe(44);
        expect(date.getSeconds()).not.toBe(undefined);
    });

    it('Should return specific year and month and day and hour and minute and seconds', () => {
        const dateGen = Random.dateWithSpecific({ year: 2010, month: 4, day: 10, hour: 13, minute: 44, seconds: 32});
        expect(typeof dateGen).toBe('function');

        expect(typeof dateGen()).toBe('object');
        
        const date = dateGen();
        expect(date.getFullYear()).toBe(2010);
        expect(date.getMonth()).toBe(3);
        expect(date.getDate()).toBe(10);

        expect(date.getHours()).toBe(13);
        expect(date.getMinutes()).toBe(44);
        expect(date.getSeconds()).toBe(32);
    });
});


