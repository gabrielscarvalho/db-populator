
import Column, { NamedColumn } from './column';
import DataRow from '../data/DataRow';
import Value from './value';
import Database from '../database';
import Parser from './value/parser';
import Exception from '../exceptions/exception';
import NamedMap from '../commons/named-map';


export class Table {

    protected columns: NamedMap<Column> = new NamedMap<Column>(false);    
    protected dataRow: DataRow[] = [];


    constructor(public database: Database, public name: string) {

    }

    setDatabase(database: Database) {
        this.database = database;
    }


    getColumns(): Column[] {
        return this.columns.values();
    }


    addPrimaryKey(identifier: string): Table {
        
        if(this.getColumnIds().indexOf(identifier) < 0) {
            let exc: Exception = new Exception('Invalid column identifier', `the column [${identifier}] was not found.`);
            exc.column(this.name, identifier);
            exc.value(this.getColumnIds().join(','), identifier);
            exc.example(`table.addPrimaryKey('one-of-the-list');`)
            exc.throw();
        }

        this.getColumn(identifier).setPrimaryKey(true);
        return this;
    }


    addDataRow(dataRow: DataRow) {
        this.dataRow.push(dataRow);
    }

    getLastDataRow(): DataRow {
        const dataRow: DataRow = this.dataRow[this.dataRow.length - 1];
        return dataRow;
    }

    addColumn(identifier: string, type: string, valOrColumn: Column | any, columnName: string | undefined = undefined): Table {

        let val = valOrColumn;

        if (this.getColumn(identifier, false) != null) {
            let exc: Exception = new Exception('Duplicated column identifier', `the column [${identifier}] is already taken.`);
            exc.column(this.name, identifier);
            exc.example(`table.addColumn('column-id' <---, 'value', 'column-name');`)
            exc.throw();
        }

        if (columnName != undefined && this.getColumnByName(columnName) != null) {
            let exc: Exception = new Exception('Duplicated column name', `the column name: [${columnName}] is already taken.`);
            exc.prop(this.name, identifier, 'columnName');
            exc.example(`table.addColumn('column-id', 'value', 'column-name' <---);`)
            exc.throw();
        }

        if (valOrColumn instanceof Column) {
            val = () => {
                const dataRow: DataRow = valOrColumn.table.getLastDataRow();
                return dataRow.getData(valOrColumn.identifier);
            }
        }

        const parser: Parser = this.database.getParser(type);

        if (parser == null) {
            let exc: Exception = new Exception('Invalid column type', `could not find parser for specified type`);
            exc.prop(this.name, identifier, 'type');
            exc.example(`Try to create a new parser or choose one of the pre-existent`);
            exc.value(this.database.getParsersName().join(','), type);
            exc.throw();
        }

        let col: Column = new Column(this, identifier, parser, new Value(val), columnName);
        this.columns.put(identifier, col);
        return this;
    }



    public getColumn(identifier: string, throwIfNotFound: boolean = true): Column {
        return this.columns.get(identifier, throwIfNotFound);
    }

    protected getColumnIds(): string[] {
        return this.columns.names();
    }

    protected getColumnByName(columnName: string): Column {
        let found: Column = null;
        let name: string;

        for (name in this.columns) {
            if (columnName == name) {
                found = this.columns[name];
            }
        }
        return found;
    }

    public getName(): string {
        return this.name;
    }
}

export default Table;