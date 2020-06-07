import Column from "../database/column";
import DataRow from "../data/DataRow";
import QueryCommand from "../query/query-command";


interface iDatabase {
    
    tables: Map<string, iTable>;
    parsers: Map<string, iParser>;

    /**
     * Creates a new table.
     * @param name the name of the table
     * @return iTable
    */
    newTable(name: string) : iTable;


    getTable(name: string): iTable;

    addParser(name: string, parser: iParser) : iDatabase;

    getParser(name: string) : iParser;

    getParsers() : iParser[]

}


interface iTable {

    name: string;
    database: iDatabase;
    columns: Map<string, Column>
    dataRows: DataRow[];

    addPrimaryKey(identifier: string): iTable;

    addColumn(identifier: string, type: string, val: any | Column, name : string) : iTable;

    getColumn(identifier: string) : iColumn;

    getColumns(): Column[];

    getLastDataRow() : iDataRow;
}


interface iColumn {
    table: iTable;
    id: string;
    parser: iParser;
    valueGenerator: iValueGenerator;
    name: string;
    isPrimary: boolean;
}


interface iDataRow {
    data: Map<iColumn, iDataRowCol>;
    table: iTable;
    queryCommand: QueryCommand;

    addData(column: iColumn, val: any);

    getData(column: iColumn) : iDataRowCol;

    set(columnId: string, val: any);

    get(columnId: string) : any;

    clone(): iDataRow;

    set(columnId: string, val: any);
}


interface iDataRowCol {
    dataRow: iDataRow;
    column: iColumn;
    val: any;

    getParsedValue(): string;
}


interface iValueGenerator {
    get(previousResult: iDataRowCol) : any;
}


interface iParser {
    type: string;
    parse(val: any): string;
}




