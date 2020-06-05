
import { Column } from '../column';
import  Value  from '../value';
import  Table  from '../table';




export class ReferenceColumn implements Column {
    type: string;
    val: Value;

    constructor(public table: Table, public identifier: string, protected reference: Column, public name: string | undefined = undefined) {
        this.type = reference.type;
        this.val = reference.val;
    }
}

export default ReferenceColumn;
