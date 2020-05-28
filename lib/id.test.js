const Id = require('./id');



let id = new Id({});


describe('verify if is updating correctly', ()=> {

    id.setInitialIds({
        't_customer': 50
    });

    it('Should return the next id correctly', () => {
        const result = id.getNext('t_customer');
        expect(typeof result).toBe('function');
        expect(result()).toBe(51);
    });

    it('if asked again must bring the next correctly', () => {
        const nextId = id.getNext('t_customer');
        expect(nextId()).toBe(52);
    });

    it('if asked to get the current value, must return the last', () => {
        const current = id.getCurrent('t_customer');
        expect(typeof current).toBe('function');
        expect(current()).toBe(52);
    });

    it('if asked to get the id of a unknown table, must return 1', () => {
        const result = id.getNext('NOT_MAPPED');
        expect(typeof result).toBe('function');
        expect(result()).toBe(1);
        expect(result()).toBe(2);
    });


    it('when changed the strategy, must select the next id correctly', () => {
        id.setNextIdStrategy((tableName, previousId) => {
            if(tableName == 't_customer'){
                return previousId+10;
            }
            return previousId+1;
        });

        const currentID = id.getCurrent('t_customer')();
        const newID = id.getNext('t_customer')();
        expect(newID).toBe(currentID+10);

        expect(id.getNext('other')()).toBe(1);
        expect(id.getNext('other')()).toBe(2);
    });
    
    it('when informed invalid strategy, must throw error', () => {
        expect( () =>{
            id.setNextIdStrategy(({not: 'a function'}));
        }).toThrow(Error);
    });

    it('when asked for random code, must do it properly', () => {
        const codeGen = id.getNextRandomCode('uniqueName');
        expect(typeof codeGen).toBe('function');

        let code = codeGen();
        expect(typeof code).toBe('string');
        expect(code.indexOf('uniqueName')).toBe(0);

        expect(code.length).toBe(15);

        let savedIds = [code]
        //assure that when retry 10000 times, it wont repeat.
        for(let i=0; i<10000; i++){
            let newCode = codeGen();
            expect(savedIds[newCode]).toBe(undefined);
            savedIds.push(newCode);
        }

    });

    it('when informed prefix, must use', () => {
        const codeGen = id.getNextRandomCode('uniqueName','prefix');
        expect(typeof codeGen).toBe('function');
        
        let code = codeGen();
        expect(typeof code).toBe('string');                
        expect(code.indexOf('prefix')).toBe(0);
        expect(code.length).toBe(11);
    });
   
    it('when informed random length, must use', () => {
        const codeGen = id.getNextRandomCode('uniqueName','A', 10);
        expect(typeof codeGen).toBe('function');
        
        let code = codeGen();
        expect(typeof code).toBe('string');                
        expect(code.indexOf('A')).toBe(0);
        expect(code.length).toBe(11);
    });
   

    it('when asked to get the last one, must do it', () => {
        const codeGen = id.getNextRandomCode('uniqueName','AAA', 3);
        expect(typeof codeGen).toBe('function');
        
        let currentCode = id.getCurrentCode('uniqueName');
        expect(typeof currentCode).toBe('function');

        let code = codeGen();
        expect(currentCode()).toBe(code);
        let lastOne = codeGen();
        expect(currentCode()).toBe(lastOne);
    });

});