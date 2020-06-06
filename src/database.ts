import Table from './database/table';
import Parser from './database/value/parser';
import DefaultParsers from './database/value/parser/default-parsers';
import Column from './database/column';



export class Database {

    protected tables: Map<string, Table> = new Map<string, Table>();
    protected parsers: Map<string, Parser> = new Map<string, Parser>();

    constructor() {
        this.parsers = DefaultParsers.get();
    }


    newTable(name: string) : Table {
        const table: Table = new Table(this, name);
        this.tables[name] = table;
        return table;
    }

    getTable(tableName: string) {
        return this.tables[tableName];
    }


    getParser(type: string) : Parser {
        return this.parsers[type]
    }

    addParser(type: string, parser: Parser): Database {
        this.parsers[type] = parser;
        return this;
    }
}

export default Database;