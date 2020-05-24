


class Table {

    constructor(dataGen){
        this.dataGen = dataGen;
    }

    generateData(extraData) {
    
        let result = {};
        let completeResult = {}

        for(const prop in this.dataGen) {

            let value = this.dataGen[prop].val; 
            let type = this.dataGen[prop].type;
            let column = this.dataGen[prop].column ? this.dataGen[prop].column : prop;

            if(typeof value == 'function'){
                value = value();
            }

            if(extraData[prop]){
                value =  typeof extraData[prop] == 'function' ? extraData[prop]() : extraData[prop];
            }

            result[prop] = value;
            completeResult[column] = { type, val: value, column }

        }
        return { simpleResult: result, completeResult: completeResult } ;
    }

}




const configure = (db) => {
    this.db = db;

    const fn =  (tableName, extraData) => {
    
        const table = new Table(this.db.structure[tableName]);
        const data = table.generateData(extraData);

        this.db.insert(tableName, data.completeResult);

        console.log('this method will deal with the inserts', data);
        return data.simpleResult;
    
    };

    fn.printAll = () => {
        db.sqls.forEach(sql => console.log(sql));
    }
    return fn;
}




module.exports = configure;