import Table from './database/table';
import Parser from './database/value/parser';



type NamedParser  = [string, Parser];
type NamedTable  = [string, Table];

export class Database {
    protected tables: NamedTable[] = [];
    protected parsers: NamedParser[] = [];

    addTable(table: Table): Database {
        this.tables[table.name]  = table;
        return this;
    }

    getTable(tableName: string) {
        return this.tables[tableName];
    }

    addParser(type: string, parser: Parser): Database {
        this.parsers[type] = parser;
        return this;
    }
}

export default Database;