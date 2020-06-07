
import Column, { NamedColumn } from './column';
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

    setDatabase(database: Database) {
        this.database = database;
    }


    getColumns(): Column[] {
        let columns: Column[] = [];
        let name: string;

        for (name in this.columns) {
            let column: Column = this.columns[name];
            columns.push(column);
        }

        return columns;
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
        return this.dataRow[this.dataRow.length - 1];
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
        this.columns[identifier] = col;
        return this;
    }



    public getColumn(identifier: string, throwIfNotFound: boolean = true): Column {
        const column: Column = this.columns[identifier];

        if (column == undefined && throwIfNotFound) {
            let columnIds: string = this.getColumnIds().join(',');
            let exc: Exception = new Exception('Unknown column', `could not find the column '${identifier}'`);
            exc.column(this.name, identifier);
            exc.value(columnIds, identifier);
            exc.example(`table.getColumn('one-of-the-list');`)
            exc.throw();
        }

        return column;
    }

    protected getColumnIds(): string[] {
        let ids: string[] = [];
        let id: string;
        for (id in this.columns) {
            ids.push(id);
        }
        return ids;
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