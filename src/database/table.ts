
import Column, { NamedColumn } from './column';
import DataRow from '../data/data-row';
import Value from './value';
import Database from '../database';
import Parser, { isParser } from './value/parser';
import Exception from '../exceptions/exception';
import NamedMap from '../commons/named-map';
import _ from "lodash";
import { ParserFloat } from './value/parser/parser-float';


export class Table {

    public columns: NamedMap<Column> = new NamedMap<Column>(false);
    protected dataRow: DataRow[] = [];

    protected fnAfterGenerateData: Function = data => (data);

    constructor(public database: Database, public name: string) {

    }

    setDatabase(database: Database) {
        this.database = database;
    }


    getColumns(): Column[] {
        return this.columns.values();
    }


    addPrimaryKey(identifier: string): Table {

        if (this.columns.searchByProp('identifier', identifier) == null) {
            let exc: Exception = new Exception('Invalid column identifier', `the column [${identifier}] was not found.`);
            exc.column(this.name, identifier);
            exc.value(this.columns.getAllProp('identifier').join(','), identifier);
            exc.example(`table.addPrimaryKey('one-of-the-list');`)
            exc.throw();
        }

        this.getColumn(identifier).setPrimaryKey(true);
        return this;
    }


    addDataRow(dataRow: DataRow) {
        this.fnAfterGenerateData(dataRow);
        this.dataRow.push(dataRow);
    }

    getLastDataRow(): DataRow {
        const dataRow: DataRow = this.dataRow[this.dataRow.length - 1];
        return dataRow;
    }

    addColumn(identifier: string, type: any | string , valOrColumn: Column | any, columnName: string | undefined = undefined): Table {

        let val = valOrColumn;

        if (this.columns.has(identifier)) {
            let exc: Exception = new Exception('Duplicated column identifier', `the column [${identifier}] is already taken.`);
            exc.column(this.name, identifier);
            exc.example(`table.addColumn('column-id' <---, 'value', 'column-name');`)
            exc.throw();
        }

        if (columnName != undefined && this.columns.searchByProp('name', columnName) != null) {
            let exc: Exception = new Exception('Duplicated column name', `the column name: [${columnName}] is already taken.`);
            exc.prop(this.name, identifier, 'columnName');
            exc.example(`table.addColumn('column-id', 'value', 'column-name' <---);`)
            exc.throw();
        }

        if (valOrColumn instanceof Column) {
            val = () => {
                const dataRow: DataRow = valOrColumn.table.getLastDataRow();
                return dataRow.get(valOrColumn.identifier);
            }
        }

        let parser: Parser = null;

        if (isParser(type)) {
            parser = type;
        } else {
            parser = this.database.getParser(type);
        }

    
        if (parser == null) {
            let exc: Exception = new Exception('Invalid column type', `could not find parser for specified type`);
            exc.prop(this.name, identifier, 'type');
            exc.example(`Try to create a new parser or choose one of the pre-existent`);
            exc.value(this.database.getParsersType().join(','), type);
            exc.throw();
        }

        let col: Column = new Column(this, identifier, parser, new Value(val), columnName);
        this.columns.put(identifier, col);
        return this;
    }

    public getColumn(identifier: string, throwIfNotFound: boolean = true): Column {
        return this.columns.get(identifier, throwIfNotFound);
    }


    public afterGenerateData(fn: Function): Table {
        this.fnAfterGenerateData = fn;
        return this;
    }



}

export default Table;