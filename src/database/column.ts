import Value from './value';
import Table from './table';
import Parser from './value/parser';
import DataRowCol from '../data/data-row-col';
import DataRow from '../data/DataRow';
import { iColumn } from '../interfaces/interfaces';


export class Column implements iColumn {

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

    getLastValue(): DataRowCol {
        const lastDataRow: DataRow = this.table.getLastDataRow();

        if (lastDataRow != undefined) {
            return lastDataRow.getDataCol(this);
        }
        return undefined;
    }

}
export type NamedColumn = [string, Column];




export default Column;