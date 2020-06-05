import Table  from './table';
import  Column  from './column';

export class Value {
    result: any[]
    constructor(protected table: Table, protected column: Column, protected fn: Function) {

    }
}

export default Value;
