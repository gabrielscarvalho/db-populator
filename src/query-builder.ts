import Database from "./database";
import DataRow from './query/DataRow';
import Table from "./database/table";
import DataGenerator from "./query/data-generator";
import QueryCommand from "./query/query-command";




export class QueryBuilder {
    protected dataRows: DataRow[] = [];

    constructor(protected database: Database) {

    }


    insert(tableName: string, extraData: object = {}): DataRow {

        const table: Table = this.database.getTable(tableName);
        const dataRow : DataRow = new DataGenerator(table, QueryCommand.INSERT).execute(extraData);
        this.dataRows.push(dataRow);

        return dataRow;
    }


    print() : string {
        return 'sqls';
    }
}


export default QueryBuilder;