import Table from './database/table';
import Parser from './database/value/parser';
import DefaultParsers from './database/value/parser/default-parsers';
import Column from './database/column';
import DatabaseConfig from './database/config';
import Exception from './exceptions/exception';
import NamedMap from './commons/named-map';



export class Database {

    protected tables: NamedMap<Table> = new NamedMap<Table>(false);
    protected parsers: NamedMap<Parser> = new NamedMap<Parser>(true);
    public config: DatabaseConfig;

    constructor() {
        this.config = new DatabaseConfig();
        this.parsers = DefaultParsers.get();
    }


    newTable(name: string): Table {
        const table: Table = new Table(this, name);
        this.tables.put(name, table);
        return table;
    }


    getTable(tableName: string) {
        return this.tables.get(tableName);
    }


    getParser(type: string): Parser {
        return this.parsers.get(type, false);
    }


    getParsersName() {
        return this.parsers.getAllProp('type');
    }

    addParser(type: string, parser: Parser): Database {
        this.parsers.put(type, parser);
        return this;
    }
}

export default Database;