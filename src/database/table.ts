
import Column, { NamedColumn }  from './column';
import DataRow from '../data/DataRow';
import Value from './value';
import Database from '../database';
import Parser from './value/parser';
import Exception from '../exceptions/exception';


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

    addColumn(identifier: string, type: string, valOrColumn: Column | any, columnName: string | undefined =  undefined): Table {

        let val = valOrColumn;

        if(valOrColumn instanceof Column) {
            val = () => {
                const dataRow: DataRow = valOrColumn.table.getLastDataRow();
                return dataRow.getData(valOrColumn.identifier);  
            }
        }

        const parser: Parser = this.database.getParser(type);
        
        if(parser == null) {
            let exc: Exception = new Exception('Invalid column type', `could not find parser for specified type`);
            exc.prop(this.name, identifier, 'type');
            exc.example(`Try to create a new parser or choose one of the pre-existent`);
            exc.value(this.database.getParsersName().join(','), type);
            exc.throw();
        }

        let col: Column = new Column(this, identifier, parser, new Value(val), columnName);
        this.columns[identifier] = col;
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