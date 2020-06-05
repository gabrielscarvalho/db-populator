

export class Value {
    protected fn: Function;

    constructor(val: any) {
        this.fn = Value.prepare(val);
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
