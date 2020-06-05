
import Column  from './column';
import DataRow from '../query/DataRow';
import Value from './value';



type NamedColumn = [string, Column];

export class Table {
    protected columns: NamedColumn[] = [];
    protected dataRow: DataRow[] = [];

    constructor(public name: string) {

    }

    addDataRow(dataRow: DataRow){
        this.dataRow.push(dataRow);
    }


    getLastDataRow(): DataRow{
        return this.dataRow[this.dataRow.length-1];
    }


    addColumnReference(name: string, type: string, reference: Column, columnName: string | undefined = undefined): Table {

        let val = () => {
            const dataRow: DataRow = reference.table.getLastDataRow();
            return dataRow.getData(reference);  
        }

        let col: Column = new Column(this, name, type, new Value(val), columnName);
        
        this.columns[name] = col;
        return this;
    }

    addColumn(name: string, type: string, val: any, columnName: string | undefined =  undefined): Table {
        let col: Column = new Column(this, name, type, new Value(val), columnName);
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