import Value from './value';
import Table from './table';


export class Column {

    constructor(
        public table: Table,
        public identifier: string,
        public type: string,
        public val: Value,
        public name: string | undefined = undefined) {
            return this;
    }
}
export type NamedColumn = [string, Column];




export default Column;