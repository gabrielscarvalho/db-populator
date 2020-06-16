import Table from './database/table';
import Parser from './database/value/parser';
import DefaultParsers from './database/value/parser/default-parsers';
import NamedMap from './commons/named-map';
import Logger from './commons/logger';


const log = new Logger();


export class Database {

    protected tables: NamedMap<Table> = new NamedMap<Table>(false);
    protected parsers: NamedMap<Parser> = new NamedMap<Parser>(true);

    constructor() {
        log.info('Initializing db');
        this.parsers = DefaultParsers.get();
    }


    newTable(name: string): Table { 
        log.group(`Adding new table: [${name}]`);
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


    getParsersType() {
        return this.parsers.getAllProp('type');
    }

    addParser(parser: Parser): Database {
        log.info(`Adding or replacing parser: [${parser.type}]`);
        this.parsers.put(parser.type, parser);
        return this;
    }
}

export default Database;