import Value from './value';
import Table from './table';
import Parser from './value/parser';


export class Column {

    public type: string;
    public isPrimary: boolean = false;
    constructor(
        public table: Table,
        public identifier: string,
        public parser: Parser,
        public val: Value,
        public name: string | undefined = undefined) {

        this.type = this.parser.type;

        if (name == undefined) {
            this.name = this.identifier;
        }
    }


    setPrimaryKey(isPrimary: boolean) {
        this.isPrimary = isPrimary;
    }

}
export type NamedColumn = [string, Column];




export default Column;