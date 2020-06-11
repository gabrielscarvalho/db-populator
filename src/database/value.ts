import DataRow from "../data/data-row";
import DataRowCol from "../data/data-row-col";


export class Value {
    protected fn: Function;

    constructor(val: any) {
        this.fn = Value.prepare(val);
    }

    get(previousVal: DataRowCol): any {
        return this.fn(previousVal);
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
