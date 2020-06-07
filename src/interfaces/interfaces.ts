import QueryCommand from "../query/query-command";
import NamedMap from "../commons/named-map";


/** 
 * Represents the root node of the database.
*/
export interface iDatabase {
    /**
     * A list of all tables inserted, kept by 'table_name' => iTable
     */
    tables: NamedMap<iTable>;

    /**
     * A list of all parsers inserted, kept by 'parser_type' => iParser
     */
    parsers: NamedMap<iParser>;

    /**
     * Creates a new table.
     * @param name the name of the table
     * @return iTable
    */
    newTable(name: string): iTable;

    /**
     * Returns the previous created table.
     * @param name {string} the name of the table
     * @return iTable
     * 
    */
    getTable(name: string): iTable;

    /**
     * Adds or replace a parser that will produce your sql.
     * @param type {string} the identifier of the parser.
     * Example: 'int', 'string', 'datetime', 'timestamp'
     * @param parser {iParser} the class that will parse the column value.
     * @return iDatabase
    */
    addParser(type: string, parser: iParser): iDatabase;

    /**
     * Returns the entity that will parse some value.
     * @param type {string} the parser identificator.
     * @return iParser
    */
    getParser(type: string): iParser;
}

/**
 * Represents the table.
*/
export interface iTable {
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
    columns: NamedMap<iColumn>
    /**
     * Keeps all registers inserted at this table.
     */
    iDataRows: iDataRow[];

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
    addColumn(identifier: string, type: string, val: any | iColumn, name: string): iTable;

    /**
     * Get the column based on its identifier
     * @param identifier {string} the column id
     * @return iColumn
     * @throws ColumnNotFound
    */
    getColumn(id: string): iColumn;

    /**
     * Inform a column that is used as primary key.
     * @param columnId {string} the id of the column
     * @return iTable
     * @throw ColumnNotFound
    */
    addPrimaryKey(columnId: string): iTable;

    /**
     * Return the last data inserted at this table.
     * @return iDataRow | undefined
    */
    getLastDataRow(): iDataRow;
}

/**
 * Represents the column of a table.
*/
export interface iColumn {
    /** 
     * Represents the table it belongs to
    */
    table: iTable;
    /**
     * the unique id that will be used to find this column.
     */
    id: string;
    /**
     * the parser that will prepare the value of this column to the insert query command.
     */
    parser: iParser;
    /**
     * the class that will generate a new value to this column.
    */
    valueGenerator: iValueGenerator;
    /**
     * the real name of this column at the database
    */
    name: string;
    /***
     * is this column an identifier of this table?
     * Used for delete queries
     */
    isPrimary: boolean;


    /**
     * Return the last inserted value at this column.
     * @return iDataRowColumn | undefined
    */
    getLastValue() : iDataRowColumn;
}

/**
 * Represents the result of an operation.
 * Keeps the generated result of the execution.
 */
export interface iDataRow {
    /**
     * a map of column -> result
     */
    data: Map<iColumn, iDataRowColumn>;
    /**
     * Which table owns this result?
     */
    table: iTable;
    /**
     * Which command is this data row for?
     * Insert, delete, update
     */
    queryCommand: QueryCommand;

    /**
     * Adds a new column data.
     * @param column {iColumn} the column that have the value
     * @param val {any} the real value of the column
     * @throw ColumnNotFound
    */
    addData(column: iColumn, val: any);

    /**
     * Gets the data from the specified column
     * @param column {iColumn} the column that you want the value
     * @return iDataRowColumn
     * @throw ColumnNotFound
    */
    getData(column: iColumn): iDataRowColumn;

    /**
     * Sets the value of a column. 
     * Used by end users due its simplicity.
     * @param columnId {string} the identifier of the column
     * @param val {any} the value
     * @throw ColumnNotFound 
    */
    set(columnId: string, val: any);

    /**
     * Gets the value of a column. 
     * Used by end users due its simplicity.
     * @param columnId {string} the identifier of the column
     * @return {any} the value
     * @throw ColumnNotFound 
    */
    get(columnId: string): any;

    /**
     * Clones the iDataRow
     * @return iDataRow 
    */
    clone(): iDataRow;
}

/**
 * Keeps the column value of one execution.
*/
export interface iDataRowColumn {
    /**
     * the result group it belongs
     */ 
    iDataRow: iDataRow;
    /**
     * the column it refers to 
     */ 
    column: iColumn;
    /**
     * the result
     */
    value: any;
    
    /**
     * Changes the value
     * @param value {any}
     */
    setValue(value: any);

    /**
     * the value parsed to be used at queries.
    */
    getParsedValue(): string;
}


export interface iValueGenerator {
    get(previousResult: iDataRowColumn): any;
}


export interface iParser {
    type: string;
    parse(val: any): string;
}




