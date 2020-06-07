import Table from './database/table';
import Parser from './database/value/parser';
import DefaultParsers from './database/value/parser/default-parsers';
import DatabaseConfig from './database/config';
import Exception from './exceptions/exception';
import { iDatabase, iTable } from './interfaces/interfaces';



export class Database implements iDatabase {

    protected tables: Map<string, iTable> = new Map<string, Table>();
    protected parsers: Map<string, Parser> = new Map<string, Parser>();
    public config: DatabaseConfig;

    constructor() {
        this.config = new DatabaseConfig();
        this.parsers = DefaultParsers.get();
    }


    newTable(name: string) : iTable {
        
        if(this.tables[name] != undefined) {
            const exc: Exception = new Exception('table already exists');
            exc.table(name);
            exc.throw();
        }

        const table: Table = new Table(this, name);
        this.tables[name] = table;
        return table;
    }


    getTable(tableName: string) {
        const table: Table = this.tables[tableName];

        if(table == undefined) {
            const exc: Exception = new Exception('table not found.');
            exc.table(name);
            exc.throw();
        }
        return table;
    }


    getParser(type: string) : Parser {
        return this.parsers[type] ? this.parsers[type] : null;
    }


    getParsersName() {
        const names: string[] = [];

        let name: string;
        for(name in this.parsers) {
            names.push(name);
        }
        return names;
    }

    addParser(type: string, parser: Parser): Database {
        this.parsers[type] = parser;
        return this;
    }
}

export default Database;