

import  Column  from '../column';
import  Value  from '../value';
import  Table  from '../table';


export class SingleColumn implements Column {
    val: Value;

    constructor(public table: Table, public name: string, public type: string, val: Function, public id: boolean) {
        this.val = new Value(table, this, val);
    }
}


export default SingleColumn;