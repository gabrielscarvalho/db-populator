
import Column, { NamedColumn } from './column';
import DataRow from '../data/DataRow';
import Value from './value';
import Database from '../database';
import Parser from './value/parser';
import Exception from '../exceptions/exception';
import { iTable, iColumn, iDatabase, iDataRow } from '../interfaces/interfaces';


export class Table implements iTable {

    /** 
      * Represents the name of the table
     */
    name: string;
    /**
     * Represents the database it belongs to.
     */
    database: iDatabase;
    /**
     * Keep all the columns of this table.
     * Format: <column.id, iColumn>
     */
    columns: Map<string, iColumn>
    /**
     * Keeps all registers inserted at this table.
     */
    iDataRows: iDataRow[];

    constructor(database: iDatabase, name: string) {
        this.database = database;
        this.name = name;
        return this;
    }


    /**
     * Adds a new column.
     * @param identifier {string} an easy identifier to name this column or its real column name
     * @param val {any | iColumn} the value generator of this column. 
     * It can be:
     * - a fixed value, e.g 'John'
     * - a function that will return a random/calculated value.
     *      - random:  random.name()
     *      - calculated: id.getNext('t_customer')
     * - a function that will return a calculated value based on the previous result.
     *      - (previous : iDataRowCol) => (previous.val + 3)
     *          - in this example, it will increase 3 every time you create an register of this table.
     * - a column that you are referencing. 
     *      - customerTable.getColumn('id') 
     *          - in this case this column will receive the last created id of the customer 
     * @param name {string} optional - the real db table column's name.
     * - if ommited the field identifier will be used as column name.
     * @return iTable
     * @throws InvalidColumn
    */
    addColumn(identifier: string, type: string, val: any | iColumn, name: string): iTable {
        return null;
    }

    /**
     * Get the column based on its identifier
     * @param identifier {string} the column id
     * @return iColumn
     * @throws ColumnNotFound
    */
    getColumn(id: string): iColumn {
        return null;
    }

    /**
     * Inform a column that is used as primary key.
     * @param columnId {string} the id of the column
     * @return iTable
     * @throw ColumnNotFound
    */
    addPrimaryKey(columnId: string): iTable {
        return this;
    }

    /**
     * Return the last data inserted at this table.
     * @return iDataRow | undefined
    */
    getLastDataRow(): iDataRow {
        return null;
    }

    /*
      protected columns: Map<string, iColumn> = new Map<string, Column>();
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
        }*/
}

export default Table;