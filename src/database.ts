import Table from './table';
import Parser from './parser';


export class Database {
    protected tables: Table[];
    protected parsers: [string, Parser];

    addTable(table: Table): Database {
        this.tables.push(table);
        return this;
    }

    addParser(type: string, parser: Parser): Database {
        this.parsers = [type, parser];
        return this;
    }
}

export default Database;