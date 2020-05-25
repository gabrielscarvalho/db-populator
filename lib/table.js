
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


module.exports=Table;