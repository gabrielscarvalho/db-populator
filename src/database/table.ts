
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


    addPrimaryKey(columnName: string) : Table {
        this.getColumn(columnName).setPrimaryKey(true);
        return this;
    }


    addDataRow(dataRow: DataRow){
        this.dataRow.push(dataRow);
    }

    getLastDataRow(): DataRow{
        return this.dataRow[this.dataRow.length-1];
    }

    addColumn(name: string, type: string, valOrColumn: Column | any, columnName: string | undefined =  undefined): Table {

        let val = valOrColumn;

        if(valOrColumn instanceof Column) {
            val = () => {
                const dataRow: DataRow = valOrColumn.table.getLastDataRow();
                return dataRow.getData(valOrColumn.identifier);  
            }
        }

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