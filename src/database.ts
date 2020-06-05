import Table from './database/table';
import Parser from './database/value/parser';



type NamedParser  = [string, Parser];


export class Database {
    protected tables: Table[] = [];
    protected parsers: NamedParser[] = [];

    addTable(table: Table): Database {
        this.tables.push(table);
        return this;
    }

    addParser(type: string, parser: Parser): Database {
        this.parsers[type] = parser;
        return this;
    }
}

export default Database;