

import  Column  from '../column';
import  Value  from '../value';
import  Table  from '../table';


export class SingleColumn implements Column {
    val: Value;

    constructor(public table: Table, public identifier: string, public type: string, val: Function, public name: string | undefined = undefined) {
        this.val = new Value(table, this, val);
    }
}


export default SingleColumn;