
import Column  from './column';
import ReferenceColumn from './column/ReferenceColumn';
import SimpleColumn from './column/SimpleColumn';
import DataRow from '../query/DataRow';



type NamedColumn = [string, Column];

export class Table {
    protected columns: NamedColumn[] = [];
    protected dataRow: DataRow[] = [];

    constructor(public name: string) {

    }

    protected prepareValue(val: any): Function {
        return () => {

        }
    }

    addDataRow(dataRow: DataRow){
        this.dataRow.push(dataRow);
    }


    getLastDataRow(){
        return this.dataRow[this.dataRow.length-1];
    }


    addColumnReference(name: string, reference: Column): Table {
        let col: Column = new ReferenceColumn(this, name, reference)
        this.columns[name] = col;
        return this;
    }

    addColumn(name: string, type: string, val: any, columnName: string | undefined =  undefined): Table {
        let col: Column = new SimpleColumn(this, name, type, this.prepareValue(val));
        this.columns[name] = col;
        return this;
    }

    getColumn(name: string): Column {
        return this.columns[name];
    }

    protected getName(): string {
        return this.name;
    }
}

export default Table;