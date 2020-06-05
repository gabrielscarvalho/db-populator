import Value from './value';
import Table from './table';


export class Column {

    constructor(
        public table: Table,
        public identifier: string,
        public type: string,
        public val: Value,
        public name: string | undefined = undefined) {

        if (name == undefined) {
            this.name = this.identifier;
        }
    }
}
export type NamedColumn = [string, Column];




export default Column;