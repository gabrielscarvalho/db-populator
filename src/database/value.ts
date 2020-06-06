import DataRow from "../data/DataRow";


export class Value {
    protected fn: Function;

    constructor(val: any) {
        this.fn = Value.prepare(val);
    }

    get(previousVal: any, previous: DataRow): any {
        return this.fn(previousVal, previous);
    }


    static prepare(val: any): Function {
        if (typeof val == 'function') {
            return val;
        }
        return () => {
            return val;
        }
    }
}


export default Value;
