
import Column, { NamedColumn }  from './column';
import DataRow from '../data/DataRow';
import Value from './value';
import Database from '../database';


export class Table {

    protected columns: Map<string, Column> = new Map<string, Column>();
    protected dataRow: DataRow[] = [];
    
    constructor(public database: Database, public name: string) {

    }

    setDatabase(database: Database){
        this.database = database;
    }


    getColumns(): Column[]{
        let columns: Column[] = [];
        let name: string;

        for(name in this.columns) {
            let column: Column = this.columns[name];
            columns.push(column);
        }

        return columns;
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
            return dataRow.getData(reference.identifier);  
        }

        let col: Column = new Column(this, name, this.database.getParser(type), new Value(val), columnName);
        this.columns[name] = col;
        return this;
    }

    addColumn(name: string, type: string, val: any, columnName: string | undefined =  undefined): Table {
        let col: Column = new Column(this, name, this.database.getParser(type), new Value(val), columnName);
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